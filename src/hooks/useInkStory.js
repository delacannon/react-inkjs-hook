import { useState } from "react";

export const useInkStory = (_story, log) => {
	const [story, setStory] = useState({
		messages: [],
		choices: [],
		tags: [],
	});

	const getChoice = ({ index }) => {
		_story.ChooseChoiceIndex(index);
		continueStory();
	};

	const continueStory = () => {
		setStory((story) => ({
			...story,
			messages: log
				? [...story.messages, getMessage(_story)]
				: [getMessage(_story)],
			tags: _story.currentTags,
			choices: _story.currentChoices,
		}));
	};

	return {
		messages: story.messages,
		tags: story.tags,
		choices: story.choices,
		log,
		continueStory,
		getChoice,
	};
};

const getMessage = (_story) => {
	let message = [];
	while (_story.canContinue) {
		message.push(_story.Continue().replace(/\n/g, ""));
	}
	return message;
};
