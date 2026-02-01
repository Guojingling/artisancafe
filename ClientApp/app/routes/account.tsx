import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { Form, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/account";

type ActionData = {
  success: boolean;
  message?: string;
  error?: string;
};

const execFileAsync = promisify(execFile);

function escapeSqlcmdValue(value: string): string {
  return value.replace(/"/g, '""').replace(/'/g, "''");
}

function getSqlcmdArgs({
  server,
  database,
  fullName,
  email,
  passwordHash,
  user,
  password,
}: {
  server: string;
  database: string;
  fullName: string;
  email: string;
  passwordHash: string;
  user?: string;
  password?: string;
}) {
  const query = `
    INSERT INTO dbo.Accounts (FullName, Email, PasswordHash, CreatedAt)
    VALUES ('$(fullName)', '$(email)', '$(passwordHash)', SYSDATETIME());
  `.trim();

  const args = ["-S", server, "-d", database, "-b", "-Q", query, "-v"];
  args.push(`fullName="${escapeSqlcmdValue(fullName)}"`);
  args.push(`email="${escapeSqlcmdValue(email)}"`);
  args.push(`passwordHash="${escapeSqlcmdValue(passwordHash)}"`);

  if (user && password) {
    args.push("-U", user, "-P", password);
  } else {
    args.push("-E");
  }

  return args;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || !password) {
    return {
      success: false,
      error: "Please fill out all fields to create your account.",
    } satisfies ActionData;
  }

  const hashedPassword = createHash("sha256").update(password).digest("hex");
  const server = process.env.SQL_SERVER ?? "AladdinDev001";
  const database = process.env.SQL_DATABASE ?? "ArtisanCafe";
  const user = process.env.SQL_USER;
  const passwordValue = process.env.SQL_PASSWORD;

  try {
    const args = getSqlcmdArgs({
      server,
      database,
      fullName,
      email,
      passwordHash: hashedPassword,
      user: user ?? undefined,
      password: passwordValue ?? undefined,
    });
    await execFileAsync("sqlcmd", args);

    return {
      success: true,
      message: "Your account has been created.",
    } satisfies ActionData;
  } catch (error) {
    console.error("Account creation failed", error);
    return {
      success: false,
      error: "We could not create your account. Please try again.",
    } satisfies ActionData;
  }
}

export default function Account() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isSuccess = actionData?.success === true;
  const isError = actionData?.success === false;

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
          <Form method="post" className="border rounded p-4 shadow-sm bg-light">
            <div className="mb-3">
              <label className="form-label" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="form-control"
                id="fullName"
                name="fullName"
                type="text"
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
                required
              />
            </div>
            <button className="btn btn-dark" type="submit" disabled={isSubmitting}>
              Create New Account
            </button>
            {isSuccess && (
              <p className="text-success mt-3 mb-0" role="status">
                {actionData?.message}
              </p>
            )}
            {isError && (
              <p className="text-danger mt-3 mb-0" role="alert">
                {actionData?.error}
              </p>
            )}
          </Form>
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="p-4 border rounded bg-white shadow-sm">
            <h2 className="h5">Local SQL Server Connection</h2>
            <p className="mb-2">
              Accounts are stored in the local SQL Server instance{" "}
              <strong>AladdinDev001</strong>.
            </p>
            <p className="mb-0 text-muted">
              Set <code>SQL_SERVER</code>, <code>SQL_DATABASE</code>,{" "}
              <code>SQL_USER</code>, and <code>SQL_PASSWORD</code> if your local
              setup differs.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
