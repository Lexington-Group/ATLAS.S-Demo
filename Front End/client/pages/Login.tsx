import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AtlasLogo from "@/assets/ALTASMain.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      style={{
        background:
          "radial-gradient(circle at top, #223C7A 0%, #162544 40%, #0A1120 100%)",
      }}
    >
      {/* Background Effects */}

      <div
        className="absolute -top-72 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full blur-[170px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,.18), rgba(41,74,170,.12), transparent 72%)",
        }}
      />

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-blue-700/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-[180px]" />

      {/* Login Card */}

      <div
        className="relative w-full max-w-[520px] overflow-hidden rounded-[30px]"
        style={{
          background: "rgba(15,23,42,.88)",
          backdropFilter: "blur(35px)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow:
            "0 40px 90px rgba(0,0,0,.55),0 0 80px rgba(212,175,55,.08)",
        }}
      >
        {/* Gold Top Line */}

        <div
          className="absolute top-0 left-0 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent,#F3D178,transparent)",
          }}
        />

        <div className="px-12 pt-10 pb-10">

          {/* Logo */}

          <div className="flex justify-center">

            <img
              src={AtlasLogo}
              alt="Atlas AI"
              draggable={false}
              className="w-[300px] object-contain select-none mx-auto"
            />

          </div>

          {/* Heading */}

          <div className="mt-5 text-center">

            <h1 className="text-[36px] font-bold tracking-tight text-white">
              Welcome Back
            </h1>

            <p className="mt-3 text-slate-400 text-[15px] leading-7">
              Access your intelligent analytics workspace
            </p>

          </div>

          <form
            onSubmit={handleSignIn}
            className="mt-8 space-y-5"  
          >
                      {/* Email */}

            <div className="space-y-2">

              <label className="text-sm font-medium text-slate-300">
                Email Address
              </label>

              <div
                className="
                  group
                  flex
                  h-14
                  items-center
                  rounded-2xl
                  border
                  border-slate-700
                  bg-[#0B1220]
                  px-5
                  transition-all
                  duration-300
                  focus-within:border-[#E7C66A]
                  focus-within:shadow-[0_0_30px_rgba(231,198,106,.18)]
                "
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="mr-4 text-slate-500 transition-colors group-focus-within:text-[#E7C66A]"
                >
                  <path
                    d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M22 7L12 14L2 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>

                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    flex-1
                    bg-transparent
                    text-white
                    placeholder:text-slate-500
                    outline-none
                  "
                />

              </div>

            </div>

            {/* Password */}

            <div className="space-y-2">

              <label className="text-sm font-medium text-slate-300">
                Password
              </label>

              <div
                className="
                  group
                  flex
                  h-14
                  items-center
                  rounded-2xl
                  border
                  border-slate-700
                  bg-[#0B1220]
                  px-5
                  transition-all
                  duration-300
                  focus-within:border-[#E7C66A]
                  focus-within:shadow-[0_0_30px_rgba(231,198,106,.18)]
                "
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="mr-4 text-slate-500"
                >
                  <path
                    d="M7 10V8a5 5 0 1110 0v2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="10"
                    rx="2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    flex-1
                    bg-transparent
                    text-white
                    placeholder:text-slate-500
                    outline-none
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    text-sm
                    text-slate-400
                    transition
                    hover:text-[#E7C66A]
                  "
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-3 text-sm text-slate-400">

                <input
                  type="checkbox"
                  className="h-4 w-4 accent-yellow-500"
                />

                Remember me

              </label>

              <button
                type="button"
                className="
                  text-sm
                  text-[#E7C66A]
                  transition
                  hover:text-yellow-300
                "
              >
                Forgot password?
              </button>

            </div>
                        {/* Sign In Button */}

            <button
              type="submit"
              className="
                relative
                w-full
                h-14
                overflow-hidden
                rounded-2xl
                font-semibold
                text-[#0A1120]
                text-base
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-[0.99]
              "
              style={{
                background:
                  "linear-gradient(180deg,#F6D365 0%,#E7C66A 45%,#D4AF37 100%)",
                boxShadow:
                  "0 12px 35px rgba(212,175,55,.35)",
              }}
            >
              <span
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(120deg,transparent 25%,rgba(255,255,255,.65) 50%,transparent 75%)",
                }}
              />

              <span className="relative z-10">
                Sign In
              </span>
            </button>

          </form>

          {/* Divider */}

          <div className="my-10 flex items-center gap-4">

            <div className="h-px flex-1 bg-slate-700" />

            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Atlas AI
            </span>

            <div className="h-px flex-1 bg-slate-700" />

          </div>

          {/* Footer */}

          <div className="text-center">

            <p className="text-sm text-slate-500">
              Enterprise Analytics Platform
            </p>

            <p className="mt-2 text-xs text-slate-600">
              © 2026 Atlas AI. All rights reserved.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}  