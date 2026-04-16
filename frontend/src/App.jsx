import React, { useState, useMemo } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import Dashboard from './pages/Dashboard'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: { main: '#818cf8', light: '#a5b4fc', dark: '#6366f1' },
          secondary: { main: '#22d3ee', light: '#67e8f9', dark: '#0891b2' },
          background: {
            default: '#050914',
            paper: 'rgba(15, 23, 42, 0.8)',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8',
          },
          divider: 'rgba(148, 163, 184, 0.08)',
          success: { main: '#34d399' },
          warning: { main: '#fbbf24' },
          error: { main: '#f87171' },
        }
      : {
          primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
          secondary: { main: '#0891b2', light: '#22d3ee', dark: '#0e7490' },
          background: {
            default: '#f0f4ff',
            paper: 'rgba(255,255,255,0.85)',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
          },
          divider: 'rgba(100, 116, 139, 0.12)',
          success: { main: '#059669' },
          warning: { main: '#d97706' },
          error: { main: '#dc2626' },
        }),
  },
  typography: {
    fontFamily: '"Sora", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontFamily: '"DM Sans", sans-serif' },
    body2: { fontFamily: '"DM Sans", sans-serif' },
    button: { fontFamily: '"Sora", sans-serif', fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          padding: '10px 22px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
})

export default function App() {
  const [mode, setMode] = useState('dark')

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  const toggleMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <Dashboard toggleMode={toggleMode} mode={mode} />
      </SnackbarProvider>
    </ThemeProvider>
  )
}
