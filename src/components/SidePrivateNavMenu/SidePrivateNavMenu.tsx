import { PathsEnum } from '../../enums/PathsEnum';
import PrimaryLink from '../PrimaryLink';

const SidePrivateNavMenu = () => {
  return (
    <aside className="d-flex flex-column">
      <h2>Private nav links</h2>
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
    </aside>
  );
};

export default SidePrivateNavMenu;
