import "./SocialCard.css";
import Location from "./Location";
import Phone from "./Phone";
import DeleteIcon from "@mui/icons-material/Delete";

const SocialCard = ({ userData, deleteUser }) => {
  return (
    <div className="card">
      <div className="card__title">
        <div>
          {userData.name.first} {userData.name.last}
        </div>

        <DeleteIcon
          onClick={() => {
            deleteUser(userData.login.uuid);
          }}
        />
      </div>
      <div className="card__body">
        <Location location={userData.location} />
        <Phone number={userData.phone} type="Home" />
        <Phone number={userData.cell} type="Cell" />
        {userData?.picture && (
          <div className="card__image">
            <img src={userData?.picture?.medium} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialCard;
