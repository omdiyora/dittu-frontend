// components/SnackbarProviderWrapper.tsx
"use client";
import { SnackbarProvider } from 'notistack';
// @ts-ignore
const SnackbarProviderWrapper: React.FC = ({ children }) => (
  <SnackbarProvider maxSnack={3}>
    {children}
  </SnackbarProvider>
);

export default SnackbarProviderWrapper;
