import { component$, useStyles$ } from '@builder.io/qwik';
import textBoxStyles from './text_box.css?inline';
export default component$((props: { code: string | object }) => {
  useStyles$(textBoxStyles);
  const finalCode =
    typeof props.code === 'object' ? JSON.stringify(props.code, null, 2) : props.code;

  return <textarea value={finalCode} readOnly={true} cols={50} rows={10} />;
});
