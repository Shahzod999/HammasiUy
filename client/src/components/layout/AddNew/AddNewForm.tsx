import "./addNewForm.scss";
import DetailsForm from "./DetailsForm";
import BasicInfoForm from "./BasicInfoForm";
import AddressForm from "./AddressForm";
import ContactForm from "./ContactForm";
import Button from "../../ui/Button/Button";
import {
  Address,
  HouseDetails,
  weSendToServerHouse,
  BasicInfoType,
} from "../../../types/home";
import { useURLState } from "../../../hooks/useURLState";
interface AddNewFormProps {
  formData: weSendToServerHouse;
  setFormData:
    | React.Dispatch<React.SetStateAction<weSendToServerHouse>>
    | React.Dispatch<React.SetStateAction<weSendToServerHouse | undefined>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddNewForm = ({
  formData,
  setFormData,
  handleSubmit,
}: AddNewFormProps) => {
  const { deleteParam } = useURLState();
  const handleBasicInfoChange = (basicInfo: BasicInfoType) => {
    setFormData((prev: any) => {
      if (!prev) return formData;
      return {
        ...prev,
        ...basicInfo,
      };
    });
  };

  const handleAddressChange = (address: Address) => {
    setFormData((prev: any) => {
      if (!prev) return formData;
      return {
        ...prev,
        address,
      };
    });
  };

  const handleInputNumberChange = (inputNumber: string) => {
    setFormData((prev: any) => {
      if (!prev) return formData;
      return {
        ...prev,
        inputNumber,
      };
    });
  };

  const handleDetailsChange = (details: HouseDetails) => {
    setFormData((prev: any) => {
      if (!prev) return formData;
      return {
        ...prev,
        details,
      };
    });
  };

  return (
    <form className="add-new-form" onSubmit={handleSubmit}>
      <BasicInfoForm
        data={{
          title: formData.title,
          text: formData.text,
          property_class: formData.property_class,
          images: formData.images,
        }}
        onChange={handleBasicInfoChange}
      />
      <AddressForm data={formData.address} onChange={handleAddressChange} />
      <ContactForm
        number={formData.inputNumber}
        onChange={handleInputNumberChange}
      />
      <DetailsForm data={formData.details} onChange={handleDetailsChange} />

      <div className="add-new-form__actions">
        <Button type="submit" className="add-new-form__submit">
          Сохранить
        </Button>
        <Button
          onClick={() => deleteParam("main-new-product")}
          type="button"
          variant="secondary"
          className="add-new-form__cancel">
          Отменить
        </Button>
      </div>
    </form>
  );
};

export default AddNewForm;
