import { createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';

import { fieldContext, formContext } from './context';

const TextField = lazy(() => import('./fields/FormTextField.tsx'));
const Checkbox = lazy(() => import('./fields/FormCheckbox.tsx'));
const Button = lazy(() => import('./buttons/FormButton.tsx'));

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    Checkbox,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export * from './utils';
