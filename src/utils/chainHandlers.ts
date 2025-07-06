type EventHandler<E = React.SyntheticEvent> = (event: E) => void;

export const chainHandlers = <E extends React.SyntheticEvent = React.SyntheticEvent>(
  ...handlers: (EventHandler<E> | undefined | boolean)[]
): EventHandler<E> => {
  return (event: E) => {
    for (const handler of handlers) {
      if (event.defaultPrevented) {
        break;
      }

      if (typeof handler === 'function') {
        handler(event);
      }
    }
  };
}
