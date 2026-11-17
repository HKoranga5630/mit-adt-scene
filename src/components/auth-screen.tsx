import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowRight, GraduationCap, Shield, Users } from 'lucide-react';

import { useAuth } from '@/data/auth-context';
import mitAdtLogo from '@/assets/mit-adt-logo.png';

type LoginRole = '' | 'admin' | 'club' | 'student';

interface AuthScreenProps {
  signup?: boolean;
  initialRole?: LoginRole;
}

const roles = [
  {
    id: 'student' as const,
    label: 'Student',
    description: 'Explore clubs and register for events',
    Icon: GraduationCap,
    to: '/student',
  },
  {
    id: 'club' as const,
    label: 'Club Representative',
    description: 'Manage your club and its events',
    Icon: Users,
    to: '/club',
  },
  {
    id: 'admin' as const,
    label: 'Admin',
    description: 'Manage the college hub',
    Icon: Shield,
    to: '/admin',
  },
];

export function AuthScreen({
  signup = false,
  initialRole = '',
}: AuthScreenProps) {
  const navigate = useNavigate();
  const { login, signup: createAccount } = useAuth();

  const [role, setRole] = useState<LoginRole>(
    initialRole || (signup ? 'student' : '')
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const availableRoles = signup
    ? roles.filter((item) => item.id !== 'admin')
    : roles;

  const selected = roles.find((item) => item.id === role);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!role) {
      setMessage('Please select your role.');
      return;
    }

    if (!email.trim() || !password.trim()) {
      setMessage('Please enter your email and password.');
      return;
    }

    setLoading(true);

    if (signup) {
      if (!name.trim()) {
        setMessage('Please enter your full name.');
        setLoading(false);
        return;
      }

      const created = createAccount({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: role as 'student' | 'club',
      });

      setLoading(false);

      if (!created) {
        setMessage('An account with this email already exists. Please log in.');
        return;
      }

      setMessage('Account created successfully! Please log in.');
      navigate({ to: '/login' });
      return;
    }

    const loggedIn = login(
      email.trim().toLowerCase(),
      password,
      role as 'student' | 'club' | 'admin'
    );

    setLoading(false);

    if (!loggedIn) {
      setMessage('Invalid email, password, or selected role.');
      return;
    }

    if (selected) {
      navigate({ to: selected.to });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img
            src={mitAdtLogo}
            alt="MIT ADT University"
            className="h-20 w-auto mx-auto mb-4 object-contain"
          />

          <h1 className="text-3xl font-bold text-slate-900">
            MIT ADT Connect
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            College Club Management &amp; Event Hub
          </p>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              {signup ? 'Create Your Account' : 'Welcome Back'}
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              {signup
                ? 'Create an account to get started.'
                : 'Log in to continue to MIT ADT Connect.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {signup && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-slate-700 mb-3">
                Select Your Role
              </p>

              <div className="grid gap-3">
                {availableRoles.map(({ id, label, description, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setRole(id);
                      setMessage('');
                    }}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                      role === id
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="rounded-lg bg-slate-100 p-3">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {description}
                      </p>
                    </div>

                    <span
                      className={`h-4 w-4 rounded-full border ${
                        role === id
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {message && (
              <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
            >
              {loading
                ? 'Please wait...'
                : signup
                  ? 'Create Account'
                  : 'Log In'}

              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-slate-600">
            {signup ? (
              <>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </section>

        <p className="text-center text-xs text-slate-500 mt-6">
          MIT ADT University · MIT ADT Connect
        </p>
      </div>
    </main>
  );
}

export function StudentLoginScreen() {
  return <AuthScreen initialRole="student" />;
}