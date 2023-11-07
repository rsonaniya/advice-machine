import Loader from "./Loader.gif";

function Quotecard({ data, isLoading }) {
  return (
    <div className="qouteCard" id="qouteCard">
      <h1>
        {isLoading ? (
          <img className="loadingImg" src={Loader} alt="Loader" />
        ) : (
          data
        )}
      </h1>
    </div>
  );
}

export default Quotecard;
