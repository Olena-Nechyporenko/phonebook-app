import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { ThreeDots } from 'react-loader-spinner';
const spinnerStyle = {
  padding: '5px 65px',
  position: 'absolute',
};
export default function ContactsPage() {
  return (
    <>
      <ContactForm />
      <Filter />
      <ThreeDots
        height="20"
        width="50"
        radius="10"
        color="#9B5CFF"
        wrapperClassName="spinner"
        wrapperStyle={spinnerStyle}
        visible={true}
      />
      <ContactList />
    </>
  );
}
