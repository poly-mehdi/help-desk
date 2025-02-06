import { addSettings, updateSetting } from '@/features/settings/settingsSlice';
import { useAppDispatch } from '@/hooks';
import { socket } from '@/socket';
import { useEffect, useState } from 'react';

export const useSettings = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.once(
      'getSettings',
      (data: { settings: Record<string, unknown> }) => {
        const { settings } = data;
        dispatch(addSettings(settings));
      }
    );
    socket.emit('getSettings');

    return () => {
      socket.off('getSettings');
      socket.off('variable.updated');
    };
  }, []);
};

