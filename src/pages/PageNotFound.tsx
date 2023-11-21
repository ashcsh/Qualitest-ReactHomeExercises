import { FC } from "react";
import { PageWrapper } from "./styles";
import { Button } from "../components/Button/Button";
import { useNavigate } from "react-router-dom"

export const PageNotFound: FC = () => {
  const navigate = useNavigate()
  const handleNavigateHome = () => {
    navigate("/")
  }

  return (
    <PageWrapper>
      <h1>Page not found</h1>
      <div>
        <Button ariaLabel="Home Button" variant="primary" onClick={handleNavigateHome}>Go Back Home</Button>
      </div>
    </PageWrapper>
  )
}

