import React from "react";

const AuthShell = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur px-6 py-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthShell;

