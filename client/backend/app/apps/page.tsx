'use client';

import Grid from '@/widgets/grid';
import { useEffect } from 'react';
import { Layout } from 'react-grid-layout';
import { Pencil, Save } from 'lucide-react';
import {
  updateLayout,
  loadLayout,
  toggleEditable,
  saveLayout,
} from '@/features/dashboard/dashboardSlice';
import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbsSlice';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useAppDispatch, useAppSelector } from '@/hooks';

export type Widget = Layout & { type: string };

function SessionsPage() {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(
    (state: { dashboardState: { layout: Widget[] } }) =>
      state.dashboardState.layout
  );
  const editable = useAppSelector(
    (state: { dashboardState: { editable: boolean } }) =>
      state.dashboardState.editable
  );

  const handleLayoutChange = (layout: Widget[]) => {
    dispatch(updateLayout(layout));
  };

  useEffect(() => {
    dispatch(loadLayout());
    dispatch(setBreadCrumbs([]));
  }, [dispatch]);

  return (
    <div>
      <Grid layout={layout} layoutChange={handleLayoutChange} />
      <div className='p-4 fixed bg-sidebar-primary bottom-5 right-5 rounded-full'>
        {editable && (
          <Save
            color='white'
            className='cursor-pointer'
            onClick={() => {
              dispatch(toggleEditable());
              dispatch(saveLayout(layout));
            }}
          ></Save>
        )}
        {!editable && (
          <Pencil
            color='white'
            className='cursor-pointer'
            onClick={() => {
              dispatch(toggleEditable());
            }}
          ></Pencil>
        )}
      </div>
    </div>
  );
}
export default SessionsPage;

