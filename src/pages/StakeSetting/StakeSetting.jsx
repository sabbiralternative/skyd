import { Link, useNavigate } from "react-router-dom";
import images from "../../assets/images";
import { useEditButtonValuesMutation } from "../../redux/features/events/events";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StakeSetting = () => {
  const [editButtonValue] = useEditButtonValuesMutation();
  const navigate = useNavigate();
  const stakes = JSON.parse(localStorage.getItem("buttonValue"));
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      buttonGameValues: stakes,
    },
  });

  const buttonGameValues = watch("buttonGameValues");

  const onSubmit = async () => {
    const payload = {
      game: buttonGameValues?.map((btn) => ({
        label: parseFloat(btn?.value),
        value: parseFloat(btn?.value),
      })),
    };

    const res = await editButtonValue(payload).unwrap();
    if (res.success) {
      toast.success(res?.result?.message);
      localStorage.removeItem("buttonValue");
      const gameButtonsValues = buttonGameValues;
      localStorage.setItem("buttonValue", JSON.stringify(gameButtonsValues));
      navigate("/");
    }
  };
  return (
    <div data-role="page" className="ui-page ui-page-theme-a ui-page-active">
      <div
        className="overlay right-side"
        id="settingDiv"
        style={{ display: "flex" }}
      >
        <div className="side-wrap setting-wrap" id="settingSlide">
          <div className="side-head">
            <h3 className="a-setting">
              <img src={images.transparent} />
              Setting
            </h3>
            <Link className="close ui-link" to="/" id="settingClose"></Link>
          </div>
          <div id="coinList" className="side-content">
            <h3>Stake</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="editCustomizeStakeList"
              className="setting-block stake-setting"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <dt>Quick Stakes</dt>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto auto",
                }}
              >
                {stakes?.map((_, idx) => {
                  return (
                    <dd key={idx}>
                      <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">
                        <input
                          {...register(`buttonGameValues.${idx}.value`)}
                          type="number"
                        />
                      </div>
                    </dd>
                  );
                })}
              </div>

              <dd className="col-stake_edit">
                <button
                  type="submit"
                  style={{ width: "100%", display: "block" }}
                  id="ok"
                  className="btn-send ui-link"
                >
                  OK
                </button>
              </dd>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeSetting;
