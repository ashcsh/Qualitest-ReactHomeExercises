import { ChangeEvent, FC } from "react";
import { StyledInput } from "./styles";

interface Props {
    onChange: (value: string) => void;
    inputType: string;
}

export const Input: FC<Props> = ({ onChange, inputType }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return <StyledInput onChange={handleChange} type={`${inputType}`} min={1} />;
}

