import React, {useState} from 'react';
import './AddTraining.scss';
import {Link} from "react-router-dom";
import handleLogout from "../../functions/logout";
import Button from "react-bootstrap/Button";
import Header from "../Header/Header";
import AddTrainingForm from "./AddTrainingForm/AddTrainingForm";
import {addTraining} from "../Ironman/Ironman";
import AddTrainingList from "./AddTrainingList/AddTrainingList";
import Footer from "../Footer/Footer";

const AddTraining = (props) => {
    const [exercisesView, setExercisesView] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState({});

    const createExerciseView = (values) => {
        setExercisesView (prevState => {
            return (
                [...prevState, {
                    name: selectedExercise.label,
                    repetitions: [values.selectedRepetitions],
                    weight: [values.selectedWeight],
                    time: [values.selectedExerciseTime],
                    id: selectedExercise.value
                }]
            )
        });
    };
    // przeszukuje exercisesView i sprawdza czy zaznaczone cwiczenie bylo juz dodawane
    // zwraca obiekt cwiczenia albo nulla gdy cwiczenie dodawane jest poraz pierwszy
    const getSelectedExercise = () => {
        let exercise = null;
        exercisesView.forEach((exerciseView) => {
            if (exerciseView.id === selectedExercise.value) {
                exercise = exerciseView;
            }
        });
        return exercise;
    };

    const addSetToSelectedExercise = (exercise, values) => {
        exercise.repetitions.push(values.selectedRepetitions);
        exercise.weight.push(values.selectedWeight);
        exercise.time.push(values.selectedExerciseTime);

        const tempArray = [...exercisesView];
        setExercisesView(tempArray);
    };

    const handleAddSet = (values) => {
        if (Object.keys(selectedExercise).length === 0 && selectedExercise.constructor === Object) {
            return alert('Musisz wybrać ćwiczenie z listy!');
        }
        if (values.selectedRepetitions === '' && values.selectedWeight === '' && values.selectedExerciseTime === '') {
            return alert('Musisz podać ilość powtórzeń, ciężar obciążenia lub czas wykonywanego ćwiczenia!');
        }

        const exercise = getSelectedExercise();

        // nie ma cwiczenia, czyli trzeba stworzyc obiekt exercise a potem dodac do niego set
        if (exercise === null) {
            createExerciseView(values);
        } else {
            addSetToSelectedExercise(exercise, values);
        }
    };

    const mapExercisesViewToApiRequest = (exercisesView,  values, valuesStepOne) => {
        const tempSets = [];

        exercisesView.forEach((exerciseView, i) => {
            exerciseView.repetitions.forEach((rep, j) => {
                tempSets.push({
                    exerciseId: +exercisesView[i].id,
                    repetitions: +exercisesView[i].repetitions[j],
                    weight: +exercisesView[i].weight[j],
                    time: +exercisesView[i].time[j]
                })
            });
        });

        return {
            name: valuesStepOne.name,
            note: valuesStepOne.notes,
            date: valuesStepOne.date + ' 00:00:00',
            duration: +valuesStepOne.duration,
            kcal: +valuesStepOne.kcal,
            sets: tempSets
        };
    };

    const handleAddTraining = (values, valuesStepOne) => {
        if (Object.keys(selectedExercise).length === 0 && selectedExercise.constructor === Object) {
            return alert('Musisz wybrać ćwiczenie z listy!');
        }
        if (values.selectedRepetitions === '' && values.selectedWeight === '' && values.selectedExerciseTime === '') {
            return alert('Musisz podać ilość powtórzeń, ciężar obciążenia lub czas wykonywanego ćwiczenia!');
        }
        const training = mapExercisesViewToApiRequest(exercisesView, values, valuesStepOne);
        addTraining(training, ()=>props.history.replace('/main'));
    };

    return (
        <>
            <Header logoLink={"/main"}>
                <Link to="/"><Button onClick={handleLogout} variant="primary">Wyloguj się</Button></Link>
            </Header>

            <AddTrainingForm setSelectedExercise={setSelectedExercise} handleAddTraining={handleAddTraining}
                             handleAddSet={handleAddSet}/>
            <AddTrainingList exercisesView={exercisesView} setExercisesView={setExercisesView}/>
            <Footer bottom={0}/>
        </>
    );
};

export default AddTraining;