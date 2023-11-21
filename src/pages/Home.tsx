import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import { PageWrapper } from "./styles";

import { useState, useEffect } from "react"

import { Slideshow } from "../components/Slideshow/Slideshow";
import { UserCard } from "../components/UserCard/UserCard";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../store/store";
import fetchUsers from "../utils/fetchUsers";

export const Home = () => {

  //redux varaibles
  const dispatch = useDispatch()
  const userData = useAppSelector((state: RootState) => state.user.userData)

  //state varaibles
  const [fetchError, setFetchError] = useState<Error | null>(null)
  const [numberInputError, setNumberInputError] = useState(false)
  const [userInputNumber, setUserInputNumber] = useState<null | number>(null)
  const [userInputSearch, setUserInputSearch] = useState("")
  const [displayedUserData, setDisplayedUserData] = useState(userData)
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [noResultSearch, setNoResultSearch] = useState(false)


  //HANDLER FUNCTIONS 

  //fetch users
  const handleFetchUsers = async (input: number) => {
    try {
      await fetchUsers(input, dispatch);
      setFetchError(null)
    } catch (error) {
      setFetchError(error as Error)
    }
  }

  //handle user number input
  const handleNumberChange = (value: string) => {
    setUserInputNumber(Number(value))
  }

  //handle user search input
  const handleSearchChange = (value: string) => {
    setUserInputSearch(value)
  }

  //show slideshow
  const handleShowSlideshow = () => {
    setShowSlideshow(true)
  }

  //hide slideshow
  const handleHideSlideshow = () => {
    setShowSlideshow(false)
  }

  const handleClickFetch = () => {
    if (userInputNumber !== null) {
      handleFetchUsers(userInputNumber)
    }
  }

  //useEffects
  useEffect(() => {
    if (userInputNumber !== null) {
      if (userInputNumber <= 0) {
        setNumberInputError(true)
      }
    } else {
      setDisplayedUserData(null)
    }

  }, [userInputNumber])

  useEffect(() => {
    if (numberInputError) {
      setTimeout(() => {
        setNumberInputError(false)
      }, 1500)
    }
  }, [numberInputError])

  useEffect(() => {
    if (userInputSearch && userData) {
      const filteredUsers = userData.data.filter((user) => {
        const convertLowerCase = userInputSearch.toLowerCase();
        return user.firstName.toLowerCase().includes(convertLowerCase) || user.lastName.toLowerCase().includes(convertLowerCase)
      });
      if (filteredUsers.length === 0) {
        setNoResultSearch(true)
      } else {
        setNoResultSearch(false)
      }
      setDisplayedUserData({ ...userData, data: filteredUsers })
    } else {
      setDisplayedUserData(userData)
    }
  }, [userInputSearch, userData])


  return (
    <PageWrapper>

      {!showSlideshow && (
        <div>
          <h1>Please type the number of users you would like to fetch:</h1>
          <div style={{ display: "flex", gap: 15 }}>
            <Input onChange={handleNumberChange} inputType={"number"} />
            <Button ariaLabel="Fetch Users" variant="primary" onClick={handleClickFetch}>{`${ displayedUserData && displayedUserData.data.length > 0 ? "Update" : "Fetch" }`}</Button>
          </div>
          {numberInputError && (
            <h2>* Please input a number bigger then 0</h2>
          )}
          {fetchError && (
            <h2>{`* ERROR : ${fetchError}`}</h2>
          )}
        </div>
      )}


      {!fetchError && userData && displayedUserData && (
        <div>
          {!showSlideshow && (
            <div>
              <h2>Search User(s) by name:</h2>
              <Input onChange={handleSearchChange} inputType={"text"} />
            </div>
          )}

          {showSlideshow && (
            <div style={{ margin: "50px 0px" }}>
              <Button ariaLabel="Slideshow" variant="primary" onClick={handleHideSlideshow}>Back</Button>
            </div>
          )}

          {!showSlideshow && (
            <>
              <div style={{ marginTop: "50px" }}>
                <Button ariaLabel="Slideshow" variant="primary" onClick={handleShowSlideshow}>Slideshow</Button>
              </div>
              <div style={{marginTop:"20px"}}>
                {!noResultSearch && (
                  <h3>{`There are ${displayedUserData.data.length} results`}</h3>
                )}
                {noResultSearch && (
                  <h3>* No results found</h3>
                )}
              </div>
              <div id="users-grid">
                {displayedUserData.data.map((user, i) => (
                  <div key={i} id="user-card"
                    style={{ backgroundColor: `${user.gender === "male" ? "#6ca0dc" : "#ff00ff"}` }}
                  >
                    <UserCard user={user} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Slideshow should be rendered here */}
      {showSlideshow && userData && (
        <Slideshow users={userData} />
      )}
    </PageWrapper>
  );
};
