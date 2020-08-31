## Procedure :-
1. Student click on "simulator" link to open the simulator.<br>
2. Student will able to see the interface of simulator.<br>
3. Student click on "Run" button to proceed the simulator.<br>
4. Enter the array size (maximum limit is 9 and minimum limit is 4).<br>
5. Enter the elements of array.<br>
6. As the elements are entered one by one the simulator will perform action as per functions (operation) used.<br>
7. At the end of experiment student will able to click on "stop" button to stop the execution.<br>

<b>Enqueue and dequeue operations(fuction) using arrays</b><br>

**1. enqueue()** <br>
1. check if the queue is full
2. for the first element, set value of FRONT to 0
3. circularly increase the REAR index by 1 (i.e. if the rear reaches the end, next it would be at the start of the queue)
4. add the new element in the position pointed to by REAR

**2. dequeue()**<br>
1. check if the queue is empty
2. return the value pointed by FRONT
3. circularly increase the FRONT index by 1
4. for the last element, reset the values of FRONT and REAR to -1
