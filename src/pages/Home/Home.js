import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../../redux/features/tourSlice";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import CardTour from "../../component/CardTour";
import "./Home.css";
import Spinner from "../../component/Spinner";
import Pagination from "../../component/Pagination";

const Home = () => {
  const { tours, loading, pageNo, dataLimit, numberOfPage } = useSelector(
    (state) => ({ ...state.tour })
  );
  const dispatch = useDispatch();

  // console.log(pageNo, "page number");
  useEffect(() => {
    dispatch(getTours({ pageNo, dataLimit }));

    // eslint-disable-next-line
  }, [pageNo]);

  const handlePageClick = (e) => {
    dispatch(setCurrentPage(e.selected + 1));
  };

  if (loading) {
    return (
        <Spinner />
    );
  }
 
  return (
    <>
      <div className="homepage__body">
        <MDBContainer>
          <MDBRow className="mt-5">
            {tours.count === 0 && (
              <MDBTypography className="text-center mb-0" tag={"h2"}>
                No Tours Found
              </MDBTypography>
            )}
            <MDBCol>
              <MDBContainer>
                {tours.count === 0 ? "" : <h2>Tour Card</h2>}
                <MDBRow className="row-cols-1 row-cols-md-3 g-2 m-0">                  
                  {tours &&
                    tours?.map((item, index) => (
                      <CardTour {...item} key={index} />
                    ))}
                </MDBRow>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Pagination
          handlePageClick={handlePageClick}
          pageCount={numberOfPage}
        />
      </div>
    </>
  );
};

export default Home;
