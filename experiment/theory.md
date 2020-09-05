## Theory

A circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle.

## Implementation of Circular Queue<br>
To implement a circular queue data structure using an array, we first perform the following steps before we implement actual operations.

     Step 1: Start
     Step 2: Declare global variable array_size, front and rear
     Step 3: Display enter array size
     Step 4: Read variable array_size
     Step 5: Declare global array queue of size array_size
     Step 6: Initialize variable
                      front <- -1
                      rear <- -1
     Step 7: End
     
<b>enQueue(value) -</b> Inserting value into the Circular Queue<br>
In a circular queue, enQueue() is a function which is used to insert an element into the circular queue. In a circular queue, the new element is always inserted at rear position. The enQueue() function takes one integer value as parameter and inserts that value into the circular queue. We can use the following steps to insert an element into the circular queue...

     Step 1: Start
     Step 2: If ( rear + 1 ) modulas array_size  equals front
                      Display Queue is full
                   Else
                      Declare variable data
                      Display enter value
                      Read variable data
                      Initialize variable
                           rear <- ( rear + 1 ) modulas array_size
                           queue[rear] <- data
                      If front equals -1
                           front <- 0
     Step 3: End
     
<b>deQueue() -</b> Deleting a value from the Circular Queue<br>
In a circular queue, deQueue() is a function used to delete an element from the circular queue. In a circular queue, the element is always deleted from front position. The deQueue() function doesn't take any value as a parameter. We can use the following steps to delete an element from the circular queue...

     Step 1: Start
     Step 2: If front equals -1
                      Display Queue is empty
                   Else
                      If front equals rear
                           Initialize variable
                                  queue[front] <- free
                                  front <- -1
                                  rear <- -1
                      Else
                           Initialize variable
                                  queue[front] <- free
                                  front <- ( fornt + 1 ) modulas array_size
     Step 3: End
     
<b>display() -</b> Displays the elements of a Circular Queue<br>
We can use the following steps to display the elements of a circular queue...

     Step 1: Start
     Step 2: If front not equals -1
                      2.1: Declare variable i
                      2.2: Initialize variable
                                  i <- front
                      2.3: If rear greater then or equla to front
                                  Repeat the step until i less then or equals to rear
                                       Display value at i is queue[i]
                                       i <- i + 1
                              Else
                                  Repeat the step until i less then array_size
                                       Display value at i is queue[i]
                                       i <- i + 1
                                  Initialize variable
                                       i <- 0
                                  Repeat the step until i less then equals to rear
                                       Display value at i is queue[i]
                                       i <- i + 1
                   Else
                      Display Queue is empty
     Step 3: End
<b>isFull() -</b>Chec whether queue is full or not<br>

     Step 1: Start
     Step 2: If ( rear + 1 ) modulas array_size  equals front
                      Display Queue is full
                   Else
                      Display Queue is not full
     Step 3: End
<b>isEmpty() -</b>Chec whether queue is Empty or not<br>

     Step 1: Start
     Step 2: If front equals -1
                      Display Queue is empty
                   Else
                      Display Queue is not empty
     Step 3: End
