import { useGetAllCompaniesQuery } from "../../api/endpoints/companyApiSlice";
import HeaderTitle from "../../components/common/HeaderTitle/HeaderTitle";
import Loading from "../../components/common/Loading/Loading";
import CompanyCard from "../../components/common/ProductCard/CompanyCard/CompanyCard";
import ErrorPage from "../../components/common/ErrorPage/ErrorPage";
const Companies = () => {
  const { data, isLoading, error } = useGetAllCompaniesQuery();
  return (
    <div className="companies-page container container__side">
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      <HeaderTitle title="Компании" />
      {data?.companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  );
};

export default Companies;
