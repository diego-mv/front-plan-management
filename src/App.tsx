import { CircularProgress, ThemeProvider, styled } from '@mui/material'
import { MaterialDesignContent, SnackbarProvider } from 'notistack'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import AppRoutes from './AppRoutes'
import store from './redux/store'
import theme from './theme';
import { SnackbarUtilsConfigurator } from './utilities/snackbar.utility'
import CssBaseline from '@mui/material/CssBaseline';
const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#2D7738',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#f44336',
  },
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
      >

        <SnackbarUtilsConfigurator />
        <Suspense fallback={<CircularProgress />}>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </Suspense>
      </SnackbarProvider>
    </ThemeProvider >

  )
}

export default App
