import React, { useEffect, useState } from 'react';
import { Button, Div, Panel, Title, Radio, FixedLayout, FormItem } from '@vkontakte/vkui';
import { Icon48ArrowLeftOutline, Icon48ArrowRightOutline } from '@vkontakte/icons';
import { userData } from '../../data/userData'
import { questionsData } from '../../data/questionsData'
import Header from '../../components/Header/Header'

import './Test.css';

const Test = ({ id, handleAction }) => {

	const [user, setUser] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [currentQuestionId, setCurrentQuestionId] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState(null);
	const [answers, setAnswers] = useState([]);
	const handle = handleAction || (() => {});

	const nextQuestion = () => {
		if (currentAnswer == null) { return; }
		if ((currentQuestionId + 1) >= questions.length) {
			handle({ answers })
		} else {
			answers[currentQuestionId] = currentAnswer
			setAnswers(answers);
			setCurrentAnswer(null);
			setCurrentQuestionId(currentQuestionId + 1);
		}
	}

	const changeAnswer = e => {
		setCurrentAnswer(e.target.value);
	}

	useEffect(async () => {
		const user = await userData.getUserBaseInfo();
		setUser(user);

		const questions = await questionsData.getQuestions();
		setQuestions(questions);

	});

	return (
		<Panel id={id}>
			<Header avatar={user ? user.photo_100 : null} />

			{ questions && questions.length ?
			<div>
				<Div style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 60, paddingBottom: 60, color: 'black' }}>
					<Title
						adjustsFontSizeToFit={true}
						style={{ textAlign: "center" }}
						level="2"
					>
						<span>{ currentQuestionId + 1 }/{ questions.length }</span>
						<br /> <br />
						{ questions[currentQuestionId].Question }
					</Title>
				</Div>
				<div style={{ fontSize: 18, paddingBottom: 80 }}>
					<FormItem>
						{ questions[currentQuestionId].Answers.map((a, i) => {
							return <Radio key={`${currentQuestionId}${i}`} onChange={changeAnswer} weight="semibold" name="answer" value={i}>{ a[0] }</Radio>
						}) }
					</FormItem>
				</div>
			</div>
			: null }
			<FixedLayout vertical="bottom">
				<Div style={{ display: 'flex', backgroundColor: "#fff" }}>
					<Button
						stretched
						mode="secondary"
						before={<Icon48ArrowLeftOutline />}
						style={{ marginRight: '10px' }}
					></Button>
					<Button
						disabled={currentAnswer == null}
						onClick={nextQuestion}
						stretched
						before={<Icon48ArrowRightOutline />}
					></Button>

				</Div>
			</FixedLayout>

		</Panel>
	);
};


export default Test;
