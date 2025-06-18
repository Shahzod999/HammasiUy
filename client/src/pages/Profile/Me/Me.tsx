import BottomSheet from "../../../components/common/BottomSheet/BottomSheet";
import "./Me.scss";
import SVG from "react-inlinesvg";
import { useURLState } from "../../../hooks/useURLState";
import CompanyForm from "./CompanyForm";
import OpenFromSide from "../../../components/common/OpenFromSide/OpenFromSide";
import LanguageSwitcher from "../../../components/layout/LanguageSwitcher/LanguageSwitcher";
import Password from "../../Auth/SetPassword/Password";
import {
  useGetMyCompanyQuery,
  useDeleteCompanyMutation,
} from "../../../api/endpoints/companyApiSlice";
import { succesToast } from "../../../store/slices/Toast/toastSlice";
import { errorToast } from "../../../store/slices/Toast/toastSlice";
import { useAppDispatch } from "../../../hooks/redux";
const Me = () => {
  const tg = window.Telegram.WebApp;
  const dispatch = useAppDispatch();
  const { setParam, deleteParam, getParam } = useURLState();
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();
  const { data, isLoading } = useGetMyCompanyQuery();

  const partner = getParam("partner");
  const language = getParam("language");
  const password = getParam("password");

  const user = tg.initDataUnsafe.user;

  const handleDeleteCompany = async () => {
    try {
      await deleteCompany(data?._id).unwrap();
      dispatch(succesToast("Компания удалена"));
    } catch (error) {
      dispatch(errorToast("Ошибка при удалении компании"));
    }
  };

  return (
    <>
      <div className="me">
        <div className="me__header">
          <div className="me__header__avatar">
            <img src={user?.photo_url} alt="" />
          </div>
          <div className="me__header__info">
            <p className="user-name">{user?.first_name || "имя"}</p>
            <p className="user-handle">@{user?.username || "username"}</p>
          </div>
        </div>

        <div className="me__actions">
          <div
            className="me__actions__box"
            onClick={() => setParam("partner", "true")}>
            <SVG src="/svg/partner.svg" />
            <span>Компания</span>
          </div>

          <div
            className="me__actions__box"
            onClick={() => setParam("language", "true")}>
            <SVG src="/svg/language.svg" />
            <span>language</span>
          </div>
          <div
            className="me__actions__box"
            onClick={() => setParam("password", "true")}>
            <SVG src="/svg/password.svg" />
            <span>password</span>
          </div>
        </div>
      </div>

      <BottomSheet
        isOpen={Boolean(partner)}
        onClose={() => deleteParam("partner")}>
        <div className="me__partner">
          <div className="me__partner__text">
            {data ? (
              <div className="me__partner__text__youAdded">
                <p>Ваша компания добавлена в поиск</p>
                <span onClick={handleDeleteCompany}>удалить</span>
              </div>
            ) : (
              <>
                <p>
                  Вы представляете компанию, занимающуюся строительством и
                  продажей новостроек
                </p>
                <p>
                  Просто заполните форму ниже, и мы добавим вашу информацию в
                  поиск на нашей платформе
                </p>
              </>
            )}
          </div>

          <CompanyForm data={data} isLoading={isLoading || isDeleting} />
        </div>
      </BottomSheet>

      <OpenFromSide
        isOpen={Boolean(language)}
        onClose={() => deleteParam("language")}>
        <LanguageSwitcher />
      </OpenFromSide>
      <OpenFromSide
        isOpen={Boolean(password)}
        onClose={() => deleteParam("password")}>
        <Password />
      </OpenFromSide>
    </>
  );
};

export default Me;
