export const getPauseUnPasueUIConfiguration = (isPaused, taskDetails) => {
    if (isPaused) {
      return {
        buttonLabel: 'Un-Pause',
        popupTitle: `Un-Pause Task - ${taskDetails?.name}`,
        fileName: 'UnPauseTask'
      };
    } else {
      return {
        buttonLabel: 'Pause',
        popupTitle: `Pause Task - ${taskDetails?.name}`,
        fileName: 'PauseTask'
      };
    }
  };
  
  export const getAdditionalData = (taskVariables, isPaused) => {
    if (isPaused) {
      return { additionalData: {} };
    } else {
      return {
        additionalData: {
          maximumPauseDate: taskVariables?.maxDaysToPause
            ? `P${taskVariables.maxDaysToPause}D`
            : ''
        }
      };
    }
  };