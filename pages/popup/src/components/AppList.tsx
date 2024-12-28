import { availableApps } from '@extension/shared/lib/constants/apps';

const AppList = () => {
  return (
    <div>
      {availableApps.map((app) => (
        <div key={app.name} className="flex items-center gap-2 p-2">
          <img 
            src={app.icon} 
            alt={`${app.name} icon`}
            className="size-4 align-middle"
          />
          <span>{app.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AppList;