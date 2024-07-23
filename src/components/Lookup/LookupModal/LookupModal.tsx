// import { useContext } from 'react';

// import { ReactComponent as CloseSVG } from '../../../assets/images/close.svg';
// import { LookupContext } from '../../../contexts/LookupContext';
// import SVGIcon from '../../SVGIcon/SVGIcon';
// import LookupForm from '../LookupForm/LookupForm';
// import './LookupModal.css';
// import LookupTable from '../LookupTable/LookupTable';

// interface LookupModelProps<T> {
//   data: T[];
//   title: string;
//   loading: boolean;
//   error: string | null;
// }

// const LookupModal = <T,>({
//   data,
//   loading,
//   error,
//   title,
// }: LookupModelProps<T>): JSX.Element => {
//   const { setShowLookup } = useContext(LookupContext)!;

//   return (
//     <section className="lookup-wrapper">
//       <section className="lookup-container">
//         <div className="lookup-container__header">
//           <h3 className="lookup-container__title">Search for {title}</h3>
//           <SVGIcon
//             Icon={CloseSVG}
//             fill="#565757"
//             onClick={() => setShowLookup(false)}
//           />
//         </div>
//         <LookupForm />

//         <LookupTable
//           data={data}
//           error={error}
//           loading={loading}
//           title={title}
//         />
//       </section>
//     </section>
//   );
// };

// export default LookupModal;

import { useContext } from 'react';

import { ReactComponent as CloseSVG } from '../../../assets/images/close.svg';
import { LookupContext } from '../../../contexts/LookupContext';
import SVGIcon from '../../SVGIcon/SVGIcon';
import LookupForm from '../LookupForm/LookupForm';
import './LookupModal.css';
import LookupTable from '../LookupTable/LookupTable';

interface LookupModelProps<T> {
  data: T[];
  title: string;
  loading: boolean;
  error: string | null;
}

const LookupModal = <T,>({
  data,
  loading,
  error,
  title,
}: LookupModelProps<T>): JSX.Element => {
  const { setShowLookup } = useContext(LookupContext)!;

  return (
    <section className="lookup-wrapper">
      <section className="lookup-container">
        <div className="lookup-container__header">
          <h3 className="lookup-container__title">Search for {title}</h3>
          <SVGIcon
            Icon={CloseSVG}
            fill="#565757"
            onClick={() => setShowLookup(false)}
          />
        </div>
        <LookupForm />

        <LookupTable
          data={data}
          error={error}
          loading={loading}
          title={title}
        />
      </section>
    </section>
  );
};

export default LookupModal;
