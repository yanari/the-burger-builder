import React from 'react';
import classnames from 'classnames';

import cssCl from "./BuildControls.css";
import btnClasses from './BuildControl/Buttons.css';
import BuildControl from "./BuildControl/BuildControl";

const orderBtn = [
    btnClasses.button,
    btnClasses.buttonLongshadow,
    btnClasses.buttonRounded,
    btnClasses.buttonRoyal
];

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = props => (
  <div className={cssCl.BuildControls}>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button 
      className={classnames(orderBtn)}
      disabled={!props.purchaseable }>ORDER NOW</button>
  </div>
);

export default buildControls;