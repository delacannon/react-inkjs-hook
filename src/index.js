import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import storyData from "./story.json";
import { useInkStory } from "./hooks/useInkStory";
import { Story } from "inkjs";
import "./style.css";

const story = new Story(storyData);

function InkStory() {
	const { continueStory, getChoice, messages, choices } = useInkStory(
		story,
		true
	);
	const ref = useRef();

	useEffect(() => {
		continueStory();
	}, []);

	const scrollToBottom = () => {
		ref.current.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [choices]);

	const createMarkup = (phrase) => {
		return { __html: phrase };
	};

	return (
		<div className="App">
			<a href="https://www.inklestudios.com/ink/theintercept/">
				<h1>THE INTERCEPT</h1>
			</a>
			{messages.map((text) => {
				return (
					<>
						<p key={text}>
							{text.map((phrase) => (
								<span
									key={phrase}
									dangerouslySetInnerHTML={createMarkup(phrase)}
								/>
							))}
						</p>
						<hr />
					</>
				);
			})}
			<ul ref={ref}>
				{choices.map((choice) => {
					return (
						<li onClick={() => getChoice(choice)} key={choice.index}>
							{choice.text}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

ReactDOM.render(<InkStory />, document.querySelector("#root"));
