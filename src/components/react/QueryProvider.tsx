import { useRef, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: ReactNode }) {
    const qcRef = useRef<QueryClient | undefined>(undefined);
    if (!qcRef.current) {
        qcRef.current = new QueryClient();
    }

    return <QueryClientProvider client={qcRef.current}>{children}</QueryClientProvider>;
}
