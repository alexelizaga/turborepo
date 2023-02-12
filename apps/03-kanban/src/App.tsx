import { AppRouter } from './router';
import { AppTheme } from './theme';
import { EntriesProvider, UIProvider } from './kanban';

export const App = () => {

  return (
    <EntriesProvider>
      <UIProvider>
        <AppTheme>
          <AppRouter/>
        </AppTheme>
      </UIProvider>
    </EntriesProvider>
  )
}
