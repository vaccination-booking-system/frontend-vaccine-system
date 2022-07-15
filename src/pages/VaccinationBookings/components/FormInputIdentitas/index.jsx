import React from "react";

const FormInputIdentitas = ({ alamatType, formInput1, formInput2, handleChange }) => {
  return (
    <div className="flex">
      <div className="flex-1 pr-2">
        {formInput1.map((input, idx) => {
          const { label, type, name, value } = input;
          return (
            <div className="my-4" key={idx}>
              <label className="block">{label}</label>
              {(type === "text" || type === "number") && (
                <input
                  type={type}
                  name={name}
                  value={value}
                  autoComplete="off"
                  className="border-2 p-2 rounded-lg w-full"
                  onChange={e => handleChange(e)}
                />
              )}
              {type === "select" && (
                <select name={name} className="border-2 p-[.57rem] rounded-lg w-full" onChange={e => handleChange(e)}>
                  {input.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex-1 pl-2">
        {formInput2.map((input, idx) => {
          const { type, name, value, label } = input;
          return (
            <div className="my-4" key={idx}>
              <label className="block">{label}</label>
              {type === "text" && (
                <input
                  type={type}
                  name={name}
                  value={value}
                  autoComplete="off"
                  className="border-2 p-2 rounded-lg w-full"
                  onChange={e => handleChange(e)}
                />
              )}
              {type === "select" && (
                <select name={name} className="border-2 p-[.57rem] rounded-lg w-full" onChange={e => handleChange(e)}>
                  {input.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormInputIdentitas;
