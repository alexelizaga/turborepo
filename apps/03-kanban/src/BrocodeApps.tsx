import { AppRouter } from './router';
import { AppTheme } from './theme';
import { EntriesProvider, UIProvider } from './kanban';

export const BrocodeApps = () => {

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
