export default function Loader({ show }) {
  return (
    show && (
      <div className="loader">
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#000"
            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.364-18.683,18.683h4.068
        c0-8.065,6.55-14.615,14.615-14.615c8.065,0,14.615,6.55,14.615,14.615H43.935z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    )
  );
}
