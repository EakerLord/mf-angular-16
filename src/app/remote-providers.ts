//(A <= 14) -> Manually loads the remote module.
import { loadRemoteModule } from '@angular-architects/module-federation';

export const loadPlacesService = async () => {
  const remote = await loadRemoteModule({
    type: 'module',
    remoteEntry: 'http://localhost:4200/remoteEntry.js',
    exposedModule: './PlacesService',
  });

  return remote.PlacesService;
};
