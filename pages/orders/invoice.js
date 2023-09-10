import { getInvoice } from '@/api/orders/orders';
import { PageLayout } from '@/components/Layouts/PageLayout';
import { useRouter } from 'next/router';
import { saveAs } from 'file-saver';

const GenerateInvoice = () => {
  const router = useRouter();
  const { key } = router.query;

  const nodeRef = React.useRef(null);

  const setText = (text) => (nodeRef.current.innerText = text);

  const downloadInvoice = async () => {
    setText('Generating Invoice...');
    try {
      const blob = await getInvoice(key);
      saveAs(blob, `Invoice`);
      setText('Invoice Generated');
    } catch (error) {
      console.log(error);
      setText('Error occured while generating invoice');
    }
  };

  React.useEffect(() => {
    if (key) {
      downloadInvoice();
    }
  }, [key]);

  return <div ref={nodeRef} style={{ zIndex: 99999 }} className="fixed inset-0 bg-white" />;
};

GenerateInvoice.getLayout = PageLayout.getLayout();

export default GenerateInvoice;
