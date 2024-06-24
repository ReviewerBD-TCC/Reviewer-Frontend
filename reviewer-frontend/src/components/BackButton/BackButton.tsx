import { SparkIcon } from "@bosch-web-dds/spark-ui-react";
import { backButtonProps } from "interfaces/Geral/BackButton";
import { useNavigate } from "react-router-dom";

function BackButton(props: backButtonProps) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(props.navigateTo)}>
      <SparkIcon icName={"back-left"} noPadding={true} />
    </button>
  );
}

export default BackButton;
