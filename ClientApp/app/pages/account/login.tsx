export function Login() {
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
              <form>
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
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                  <button className="btn btn-outline-secondary" type="button">
                    Create New Account
                  </button>
                </div>
              </form>
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
