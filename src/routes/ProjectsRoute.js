import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withNavigationViewController } from '@atlaskit/navigation-next';
import { ContentWrapper } from '../components';
import { productHomeView } from '../config/viewConfigs';

export default withNavigationViewController(function ProjectsRouteBase(props) {
  useEffect(() => {
    const { navigationViewController } = props;
    navigationViewController.setView(productHomeView.id);
  }, []);

  return (
    <ContentWrapper>
      <h1>Projects</h1>
      <ul>
        <li>
          <Link to="/projects/atlascat">atlascat</Link>
        </li>
        <li>
          <Link to="/projects/broken-link-example">broken link</Link>
        </li>
      </ul>
    </ContentWrapper>
  );
});
