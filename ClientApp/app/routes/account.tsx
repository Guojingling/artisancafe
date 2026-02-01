import { type FormEvent, useState } from "react";

type AccountStatus = {
  success: boolean;
  message: string;
};

export default function Account() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<AccountStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl =
    import.meta.env.VITE_ACCOUNT_API_URL ??
    "http://AladdinDev001:5000/api/accounts";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Account creation failed.");
      }

      setStatus({
        success: true,
        message: "Your account has been created.",
      });
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Account creation failed", error);
      setStatus({
        success: false,
        message: "We could not create your account. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSuccess = status?.success === true;
  const isError = status?.success === false;

  return (
    <main className="container">
      <div className="row mb-4">
        <div className="col">
          <h1 style={{ fontFamily: "Monotype Corsiva" }}>Create Account</h1>
          <p className="text-muted">
            Create a new account to place orders and track your favorites.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <form
            className="border rounded p-4 shadow-sm bg-light"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="form-control"
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button className="btn btn-dark" type="submit" disabled={isSubmitting}>
              Create New Account
            </button>
            {isSuccess && (
              <p className="text-success mt-3 mb-0" role="status">
                {status?.message}
              </p>
            )}
            {isError && (
              <p className="text-danger mt-3 mb-0" role="alert">
                {status?.message}
              </p>
            )}
          </form>
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="p-4 border rounded bg-white shadow-sm">
            <h2 className="h5">Local SQL Server Connection</h2>
            <p className="mb-2">
              Accounts are stored in the local SQL Server instance{" "}
              <strong>AladdinDev001</strong>.
            </p>
            <p className="mb-0 text-muted">
              Configure <code>VITE_ACCOUNT_API_URL</code> to point at the API
              that writes to AladdinDev001 if your local setup differs.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
