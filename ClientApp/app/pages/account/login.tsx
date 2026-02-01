import { type FormEvent, useState } from "react";

type ApiStatus = "idle" | "loading" | "success" | "error";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<ApiStatus>("idle");
  const [message, setMessage] = useState("");

  const handleApiCall = async (action: "login" | "register") => {
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("https://aladdindev001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, action }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Request failed.");
      }

      const payload = await response.json().catch(() => null);
      const successMessage =
        action === "login"
          ? "Welcome back! You are now signed in."
          : "Account created! You can now sign in.";

      setStatus("success");
      setMessage(payload?.message ?? successMessage);
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "Something went wrong.";
      setStatus("error");
      setMessage(description);
    }
  };

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !password) {
      setStatus("error");
      setMessage("Please enter both a username and password.");
      return;
    }
    await handleApiCall("login");
  };

  const handleCreateAccount = async () => {
    if (!username || !password) {
      setStatus("error");
      setMessage("Please enter both a username and password.");
      return;
    }
    await handleApiCall("register");
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h3 mb-3">Account</h1>
              <p className="text-muted">
                Use your username and password to sign in or create a new account.
              </p>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Logging in..." : "Login"}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleCreateAccount}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Creating..." : "Create New Account"}
                  </button>
                </div>
              </form>
              {message ? (
                <div
                  className={`mt-3 alert ${
                    status === "error" ? "alert-danger" : "alert-success"
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              ) : null}
              <div className="mt-4 border-top pt-3">
                <h2 className="h5">New to Artisan Cafe?</h2>
                <p className="mb-0 text-muted">
                  Creating an account lets you manage your orders, save favorites,
                  and receive updates from the cafe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
