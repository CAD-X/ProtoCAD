import * as React from 'react';
import { setCurrentComponent } from '../actions/componentsAction';
import { useSelector, useDispatch } from 'react-redux';
import { ComponentInt, GlobalState } from '../utils/InterfaceDefinitions';
import Tree from './Tree';

/**
 * Dashboard Component
 *
 * Watches for freshly created components and changes the UI to target
 * specific component.
 */
export default () => {

  // collects all existing components data from d3 tree
  const components = useSelector((state: GlobalState) => state.components.data);
  // collects current component data from d3 tree
  const current = useSelector((state: GlobalState) => state.current.data);
  const dispatch = useDispatch();

  // watches for newly created compoents
  React.useEffect(() => {
    const newComponent = components.filter((item: ComponentInt) => item.name === current.name);
    // if new component exists, set it to the current component view
    if (newComponent.length > 0) dispatch(setCurrentComponent(newComponent[0]));
    else if (components.length > 0) {
      dispatch(setCurrentComponent(components[0]));
    } else {
      dispatch(setCurrentComponent({}));
    }
  }, [components]);


  return <div id={'dashboard'}>
    <Tree />
  </div>
};
