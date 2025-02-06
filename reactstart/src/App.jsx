import { useState, useCallback, useEffect, useRef } from "react";
import './index.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState('');

  // Ref hook
  const passwordRef = useRef(null);

  // Generate password
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) string += '0123456789';
    if (char) string += '!@#$%^&*()_+';

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * string.length);
      pass += string.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, number, char]);

  // Copy password
  const copyPassword = useCallback(() => {
    if (passwordRef.current) {
      const input = passwordRef.current;

      // Temporarily remove readOnly
      input.readOnly = false;

      // Select and copy
      input.select();
      input.setSelectionRange(0, 99999); // For mobile devices
      document.execCommand('copy');

      // Reapply readOnly
      input.readOnly = true;

      alert("Password copied to clipboard!");
    }
  }, [password]);

  // Generate password on initial render or dependency change
  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <>
      <h1 className="text-5xl font-bold text-center text-white mb-6">PASSWORD GENERATOR</h1>

      <div className="w-full max-w-md mx-auto text-center shadow-lg rounded-xl px-6 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center shadow-md rounded-lg overflow-hidden mb-4 bg-white">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-gray-800 text-lg"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 transition duration-300 ease-in-out"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={char}
              id="charInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
