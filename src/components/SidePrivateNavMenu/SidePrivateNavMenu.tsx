import { PathsEnum } from '../../enums/PathsEnum';
import PrimaryLink from '../PrimaryLink';

const SidePrivateNavMenu = () => {
  return (
    <div className="d-flex flex-column">
      <h2>utility links</h2>
      {Object.entries(PathsEnum)
        .filter(([key]) => key.startsWith('PRIVATE'))
        .map(([key, value]) => (
          <PrimaryLink
            key={key}
            path={value}
            content={value.replace(/[^a-zA-Z\s]/g, '')}
            style={['linkFlush', 'txtMySecondary']}
          />
        ))}
    </div>
  );
};

export default SidePrivateNavMenu;
