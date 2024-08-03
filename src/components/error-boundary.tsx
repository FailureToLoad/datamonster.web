import { Link } from "react-router-dom";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  err: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    err: null,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, err: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      <div className="mt-28 flex h-screen w-full flex-col items-center">
        <h1 className="text-neutral-grayish-blue text-8xl">Error </h1>
        <p className="text-neutral-grayish-blue my-10 text-4xl">
          <i>
            {(this.state.err as Error)?.message ||
              (this.state.err as { statusText?: string })?.statusText}
          </i>
        </p>
        <Link
          to={"/welcome"}
          className="bg-neutral-dark-blue text-neutral-white rounded-md p-2"
        >
          Back Home
        </Link>
      </div>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
