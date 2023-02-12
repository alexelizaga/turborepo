import { AppTheme } from './theme';

import { AppRouter } from './router';
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
