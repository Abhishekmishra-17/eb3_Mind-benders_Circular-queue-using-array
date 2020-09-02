function main(){
    let loaderio = document.querySelector('.preloader');
    loaderio.parentNode.removeChild(loaderio);

    
    
    var algo = {
        variableName: ['array_size', 'front', 'rear', 'i', 'queue', 'data', 'queue[rear]',
                      'queue[i]'],
        colorCode: [{key:'Main', color:'grey'},
                    {key:'enQueue', color:'grey'},
                    {key:'deQueue', color:'grey'},
                    {key:'isFull', color:'grey'},
                    {key:'isEmpty', color:'grey'},
                    {key:'display', color:'grey'},
                    {key:'Step', color:'green'},
                    {key:'Start', color:'blue'},
                    {key:'End', color:'blue'},
                    {key:'Declare', color:'blue'},
                    {key:'Display', color:'blue'},
                    {key:'Read', color:'blue'},
                    {key:'Initialize', color:'blue'},
                    {key:'If', color:'blue'},
                    {key:'Else', color:'blue'},
                    {key:'and', color:'blue'},
                    {key:'global', color:'purple'},
                    {key:'variable', color:'purple'},
                    {key:'array', color:'purple'},
                    {key:'equals', color:'skyblue'},
                    {key:'equals', color:'blue'},
                    {key:'<-', color:'grey'}],
        text: `Main
          {5} Step 1: Start
          {5} Step 2: Declare global variable array_size, front and rear
          {5} Step 3: Display enter array size
          {5} Step 4: Read variable array_size
          {5} Step 5: Declare global array queue of size array_size
          {5} Step 6: Initialize variable
                            {22} front <- -1
                            {22} rear <- -1
          {5} Step 7: End

        enQueue
           {5} Step 1: Start
           {5} Step 2: If ( rear + 1 ) modulas array_size  equals front
                      {22} Display Queue is full
                   {19} Else
                      {22} Declare variable data
                      {22} Display enter value
                      {22} Read variable data
                      {22} Initialize variable
                        {27} rear <- ( rear + 1 ) modulas array_size
                        {27} queue[rear] <- data
                      {22} If front equals -1
                        {27} front <- 0
           {5} Step 3: End

        deQueue
           {5} Step 1: Start
           {5} Step 2: If front equals -1
                      {22} Display Queue is empty
                   {19} Else
                      {22} If front equals rear
                          {27} Initialize variable
                               {34} queue[front] <- free
                               {34} front <- -1
                               {34} rear <- -1
                      {22} Else
                          {27} Initialize variable
                               {34} queue[front] <- free
                               {34} front <- ( fornt + 1 ) modulas array_size
          {5} Step 3: End

        isFull 
           {5} Step 1: Start
           {5} Step 2: If ( rear + 1 ) modulas array_size  equals front 
                      {22} Display Queue is full
                   {19} Else
                      {22} Display Queue is not full
           {5} Step 3: End

        isEmpty
           {5} Step 1: Start
           {5} Step 2: If front equals -1
                     {22} Display Queue is empty
                   {19} Else
                      {22} Display Queue is not empty
           {5} Step 3: End

        display 
           {5} Step 1: Start
           {5} Step 2: If front not equals -1
                     {22} 2.1: Declare variable i 
                     {22} 2.2: Initialize variable
                            {34} i <- front
                     {22} 2.3: If rear greater then or equla to front
                         {34} Repeat the step until i less then or equals to rear
                               {39} Display value at i is queue[i]
                               {39} i <- i + 1
                     {30} Else
                          {34} Repeat the step until i less then array_size
                               {39} Display value at i is queue[i]
                               {39} i <- i + 1
                          {34} Initialize variable
                               {39} i <- 0
                          {34} Repeat the step until i less then equals to rear
                               {39} Display value at i is queue[i]
                               {39} i <- i + 1
                     {19} Else
                         {22} Display Queue is empty           
          {5} Step 3: End`,
        lines: 0,

        codeFormater: function(){
            let _this = this;
            let codeTxt = this.text.split('\n');
            let currentLine = 0;
            codeTxt.forEach(function(item, index){
                currentLine++;
                let line = item.trim().split(' ');
                let div = document.createElement('div');
                let previousKey = '';
                let string = false;
                div.classList.add('code-line-text');
                line.forEach(function(item, index){

                  let space = item.match(/\{[0-9]+\}/);
                  if(space != null){
                      space = '&nbsp;'.repeat(parseInt(item.slice(1, space[0].length-1)));
                      let span_ = document.createElement('span');
                      span_.innerHTML = space;
                      div.appendChild(span_);
                  }
                  else{
                  let span = document.createElement('span');
                  if(previousKey == 'Step' && item.search(/[0-9]:/) >= 0){
                      span.classList.add('color-green');
                  }
                  else if(string && _this.variableName.indexOf(item) < 0){
                      span.classList.add('color-yellow');
                  }
                  else{
                      span.classList.add('color-' + _this.findColor(item));
                  }
                  let text = item;
                  previousKey = text;
                  text == 'Display' ? string = true : ''; 
                  span.textContent = text;
                  index != line.length - 1 ? span.innerHTML += '&nbsp;' : '';

                  div.appendChild(span);    
                  }


                });
                document.querySelector('.code-text').appendChild(div);
            });
            this.lines = currentLine + 5;
        },

        rowFormater: function(){
            for(let x = 1; x <= this.lines; x++){
                let div1 = document.createElement('div');
                div1.classList.add('line-no');
                let span1 = document.createElement('span');
                span1.classList.add('current');
                let span2 = document.createElement('span');
                span2.classList.add('row-no');
                span2.textContent = x;
                div1.appendChild(span1);
                div1.appendChild(span2);
                document.querySelector('.editor .line').appendChild(div1);
            }
        },
        findColor: function(key){
            let color = 'blue';
            this.colorCode.forEach(function(item, index){
                if(item['key'] == key){
                    color = item['color'];
                }

            });
            if(color == 'blue'){

                if(this.variableName.indexOf(key.replace(',', '')) >=0){
                    color = 'blue';
                }
                if(color == 'blue' && key.search(/(\-|\+)*[0-9]+/g) >= 0){

                    color = 'skyblue';
                }
                if(color == 'blue' && key.search(/(\+|\-|\(|\))+/g) >= 0){
                    color = 'grey';
                }
            }
            return color;
        }
    }
    algo.codeFormater();
    algo.rowFormater();

    let editorDiv = document.querySelector('.editor');

    function gotoLine(line, duration, callback = null, skip = false){
        setTimeout(function(){
            let lineDiv = document.querySelectorAll('.editor .code-line-text');
            let lineNoDiv = document.querySelectorAll('.editor .line-no');

            for(let x = 0; x < lineDiv.length; x++){
                lineDiv[x].classList.remove('active');
                lineDiv[x].classList.remove('skip');
            }
            for(let x = 0; x < lineNoDiv.length; x++){
                lineNoDiv[x].childNodes[0].classList.remove('active');
                lineNoDiv[x].childNodes[0].classList.remove('skip');
            }
            if(line != 0){

                    lineDiv[line - 1].classList.add('active');
                    if(skip){
                        lineDiv[line - 1].classList.add('skip');
                    }
                    lineNoDiv[line - 1].childNodes[0].classList.add('active');
                    if(skip){
                        lineNoDiv[line - 1].childNodes[0].classList.add('skip');
                    }

                    let codeDiv = document.querySelector('.code-text').offsetTop;
                    let rowDiv = lineDiv[line - 1].offsetTop;

                    if((rowDiv - codeDiv + 13) > editorDiv.scrollTop && 
                        (rowDiv - codeDiv + 13) < editorDiv.scrollTop + 500){
                        //console.log('visible', (rowDiv - codeDiv + 13) , editorDiv.scrollTop);
                    }
                    else{
                        //console.log((rowDiv - codeDiv + 13) , editorDiv.scrollTop);
                        editorDiv.scroll(0, (rowDiv - codeDiv + 13) - 5);
                    }

                    if(callback){
                        callback();
                    }

            }else{
                if(callback){
                        callback();
                    }
            }
        }, duration);

    }
    /******************************** queue ***************************************/
    let terminal = document.querySelector('.commands-line');
    let enQueueelm = document.querySelector('.operations .enqueue-function');
    let deQueueelm = document.querySelector('.operations .dequeue-function');
    let isFull = document.querySelector('.operations .isfull-function');
    let isEmpty = document.querySelector('.operations .isempty-function');
    let display = document.querySelector('.operations .display-function');
    
    var questionDone = [];
    let program = true;
    let started = false;
    
    var queue = {
        size: 0,
        front: -1,
        rear: -1,
        enQueue: function(_this, e){
          let globalThis = this;
          gotoLine(12, 1000);  
          gotoLine(13, 2000);  
          gotoLine(14, 3000);
          if((this.rear + 1) % this.size  == this.front){
              gotoLine(15, 4000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is full ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
              });
              gotoLine(16, 5000, function(){}, true);
              gotoLine(17, 6000, function(){}, true);
              gotoLine(18, 7000, function(){}, true);
              gotoLine(19, 8000, function(){}, true);
              gotoLine(20, 9000, function(){}, true);
              gotoLine(21, 10000, function(){}, true);
              gotoLine(22, 11000, function(){}, true);
              gotoLine(23, 12000, function(){}, true);
              gotoLine(24, 13000, function(){}, true);
              gotoLine(25, 14000);
              gotoLine(0, 15000, start_);
              setTimeout(function(){
                if(!questionDone.includes(1)){
                            questionDone.push(1);
                            askme(1);
                }
              }, 15500);
          }else{
              gotoLine(15, 4000, function(){}, true);
              gotoLine(16, 5000);
              gotoLine(17, 6000, function(){
                  createVariable('data', '', '5804', 'free');        
              });
              gotoLine(18, 7000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' enter value ';
                    let input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    input.classList.add('getCommand');
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    div1.appendChild(input);
                    terminal.appendChild(div1);
                    document.querySelector('.getCommand').blur();
                    scrollTerminal();
              });
              gotoLine(19, 8000, function(){
                  let getCommand = document.querySelector('.getCommand');
                  getCommand.focus();
                  getCommand.addEventListener('input', function(e){
                     if(this.value.length > 0 && this.value.length < 3){ }
                      else{
                        this.value = '';
                      } 
                  });
                  getCommand.addEventListener('keypress', function(e){
                     if(this.value.length > 0 && this.value.length < 3){
                           if(e != undefined && e.keyCode == 13){
                                this.blur();
                                let span = this.previousSibling;
                                let data  = this.value; 
                                span.textContent = span.textContent + ' ' + data;
                                document.querySelector('.memory .data').classList.remove('free');
                                document.querySelector('.memory .data').classList.add('used');
                                document.querySelector('.memory .data .vvalue > span').textContent = data;
                                this.parentNode.removeChild(this);
                                gotoLine(20, 1000);
                                gotoLine(21, 2000, function(){
                                        let array = document.querySelectorAll('.array-graphical .byte');
                                        let index = document.querySelectorAll('.index-no .number');
                                        document.querySelector('.memory .rear .vvalue > span').textContent = (globalThis.rear + 1) % globalThis.size;
                                        array[(globalThis.rear + 1) % globalThis.size].classList.add('active');
                                        let previousfront = 0;
                                        if(globalThis.rear == -1){
                                            previousfront = globalThis.front;
                                            document.querySelector('.array-pointer .pointer.rear').classList.add('pos_1');
                                            
                                            //
                                        
                                        }else{
                                            if(globalThis.rear == globalThis.front){
                                            document.querySelector('.array-pointer .pointer.rear').classList.remove('pos_' + (globalThis.rear + 1));
                                            if((globalThis.rear + 1)% globalThis.size != 0){
                                            document.querySelector('.array-pointer .pointer.rear').classList.add('move_' + (globalThis.rear + 2) % (globalThis.size + 1));
                                            }else{
                                                
                                                document.querySelector('.array-pointer .pointer.rear').classList.add('move_1');
                                            }
                                                
                                            document.querySelector('.array-pointer .pointer.front').classList.remove('pos_' + (globalThis.front + 1));
                                            document.querySelector('.array-pointer .pointer.front').classList.add('move_' + (globalThis.front + 1));
                                            }else{
                                               document.querySelector('.array-pointer .pointer.rear').classList.remove('move_' + (globalThis.rear + 1));
                                               if((globalThis.rear + 1) % globalThis.size == 0){
                                                   document.querySelector('.array-pointer .pointer.rear').classList.add('move_1'); 
                                               }else{
                                                   document.querySelector('.array-pointer .pointer.rear').classList.add('move_' + ((globalThis.rear + 2) % (globalThis.size + 1))); 
                                               }
                                               
                                            }
                                        }
                                        
                                        setTimeout(function(){
                                          array[(globalThis.rear + 1) % globalThis.size].classList.remove('active');
                                          globalThis.rear = (globalThis.rear + 1) % globalThis.size;
                                        }, 500);
                                        
                                        if(globalThis.rear == -1){
                                            index[0].classList.remove('active');
                                            
                                            globalThis.front = 0;
                                            document.querySelector('.memory .front .vvalue > span').textContent = globalThis.front;
                                        }
                                        else if(globalThis.front != globalThis.rear){
                                            index[globalThis.rear + 1].classList.remove('active');
                                        }
                                        if((globalThis.rear + 1)% globalThis.size != 0){
                                            index[(globalThis.rear + 2) % (globalThis.size + 1)].classList.add('active');
                                        }else{
                                            index[1].classList.add('active');
                                        }
                                        
                                    
                                         gotoLine(22, 1000, function(){
                                            document.querySelector('.memory .queue').classList.remove('free');
                                            document.querySelector('.memory .queue').classList.add('used');

                                            
                                            array[globalThis.rear].textContent = data;
                                            array[globalThis.rear].classList.remove('free');
                                            array[globalThis.rear].classList.add('used');
                                            array[globalThis.rear].classList.add('active');
                                            document.querySelector('.array-pointer .symbol .rear').classList.add('active');
                                            setTimeout(function(){
                                                document.querySelector('.array-pointer .symbol .rear').classList.remove('active');
                                                array[globalThis.rear].classList.remove('active');
                                            }, 500);
                                            
                                            gotoLine(23, 1000, function(){
                                                 if(previousfront == -1){
                                                     gotoLine(24, 1000, function(){
                                                         document.querySelector('.array-pointer .pointer.front').classList.add('pos_1');
                                                     });
                                                 }else{
                                                     gotoLine(24,1000, function(){}, true);
                                                 }
                                             });

                                            gotoLine(25, 3000, function(){
                                                console.log(document.querySelector('.memory .data').parentNode);
                                                let data = document.querySelector('.memory .data');
                                                data.parentNode.removeChild(data);
                                            });
                                            gotoLine(0, 4000, start_);
                                             setTimeout(function(){
                                                if(!questionDone.includes(1)){
                                                            questionDone.push(1);
                                                            askme(1);
                                                }
                                              }, 4500);
                                    
                                 });
                                    
                                    });
                                
                           }
                        }
                      else{
                        this.value = '';
                      } 
                  });
              })
          }
        },
        deQueue: function(_this, e){
            let globalThis = this;
            let array = document.querySelectorAll('.array-graphical .byte');
            let indexNo = document.querySelectorAll('.index-no .number');
            gotoLine(27, 1000);
            gotoLine(28, 2000);
            gotoLine(29, 3000);
            
            if(this.front == -1){
                gotoLine(30, 4000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is empty ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                });
                gotoLine(31, 5000, function(){}, true);
                gotoLine(32, 6000, function(){}, true);
                gotoLine(33, 7000, function(){}, true);
                gotoLine(34, 8000, function(){}, true);
                gotoLine(35, 8000, function(){}, true);
                gotoLine(36, 8000, function(){}, true);
                gotoLine(37, 8000, function(){}, true);
                gotoLine(38, 8000, function(){}, true);
                gotoLine(39, 8000, function(){}, true);
                gotoLine(40, 8000, function(){}, true);
                gotoLine(41, 9000);
                gotoLine(0, 10000, start_);
                setTimeout(function(){
                    if(!questionDone.includes(2)){
                                questionDone.push(2);
                                askme(2);
                    }
                  }, 10500);
            }else{
                gotoLine(30, 4000, function(){}, true);
                gotoLine(31, 5000);
                gotoLine(32, 6000);
                if(globalThis.front == globalThis.rear){
                    gotoLine(33, 7000);
                    gotoLine(34, 8000, function(){
                        let bytes = document.querySelectorAll('.array-graphical .byte');
                        bytes[globalThis.front].textContent = 'free';
                        bytes[globalThis.front].classList.add('free');
                        bytes[globalThis.front].classList.add('active');
                        bytes[globalThis.front].classList.remove('used');
                        
                        document.querySelectorAll('.index-no .number')[globalThis.front + 1].classList.remove('active');
                        
                        document.querySelector('.array-pointer .front .symbol > i').classList.add('active');
                        setTimeout(function(){
                            bytes[globalThis.front].classList.remove('active');
                            document.querySelector('.array-pointer .front .symbol > i').classList.remove('active');
                        }, 500);
                    });
                    
                    gotoLine(35, 9000, function(){
                        document.querySelector('.array-pointer .front').classList.remove('pos_' + (globalThis.front + 1));
                        document.querySelector('.index-no .number').classList.add('active');
                        globalThis.front = -1;
                        document.querySelector('.memory .front .vvalue > span').textContent = globalThis.front;
                    });
                    gotoLine(36, 10000, function(){
                        document.querySelector('.array-pointer .rear').classList.remove('pos_' + (globalThis.rear + 1));
                        globalThis.rear = -1;
                        document.querySelector('.memory .rear .vvalue > span').textContent = globalThis.rear;
                    });
                    gotoLine(37, 11000, function(){}, true);
                    gotoLine(38, 12000, function(){}, true);
                    gotoLine(39, 13000, function(){}, true);
                    gotoLine(40, 14000, function(){}, true);
                    gotoLine(41, 15000);
                    gotoLine(0, 16000, start_);
                }else{
                     gotoLine(33, 7000, function(){}, true);
                     gotoLine(34, 8000, function(){}, true);
                     gotoLine(35, 9000, function(){}, true);
                     gotoLine(36, 10000, function(){}, true);
                     
                     gotoLine(37, 11000);
                     gotoLine(38, 12000);
                    
                     gotoLine(39, 13000, function(){
                            let bytes = document.querySelectorAll('.array-graphical .byte');
                            bytes[globalThis.front].textContent = 'free';
                            bytes[globalThis.front].classList.add('free');
                            bytes[globalThis.front].classList.add('active');
                            bytes[globalThis.front].classList.remove('used');
                            
                            setTimeout(function(){
                                bytes[globalThis.front].classList.remove('active');
                            }, 500);
                            
                     });
                    
                    gotoLine(40, 14000, function(){
                        document.querySelectorAll('.index-no .number')[globalThis.front + 1].classList.remove('active');
                        document.querySelector('.array-pointer .front').classList.remove('move_' + (globalThis.front + 1));
                        if(globalThis.front + 1 == globalThis.rear){
                            
                            document.querySelector('.array-pointer .rear').classList.remove('move_' + (globalThis.rear + 1));
                            document.querySelector('.array-pointer .front').classList.add('pos_' + (globalThis.front + 2));
                            document.querySelector('.array-pointer .rear').classList.add('pos_' + (globalThis.rear + 1));
                            
                        }else{
                            
                            if((globalThis.front + 1) % globalThis.size == 0){
                                 if((globalThis.front + 1) % globalThis.size == globalThis.rear){
                                     document.querySelector('.array-pointer .front').classList.add('pos_1');
                                     document.querySelector('.array-pointer .rear').classList.add('pos_1');
                                     document.querySelector('.array-pointer .rear').classList.remove('move_1');
                                 }else{
                                     document.querySelectorAll('.index-no .number')[1].classList.add('active');
                                     document.querySelector('.array-pointer .front').classList.add('move_1');
                                     document.querySelectorAll('.index-no .number')[1].classList.add('active');
                                 }
                            }else{
                               document.querySelectorAll('.index-no .number')[globalThis.front + 2].classList.add('active');
                               document.querySelector('.array-pointer .front').classList.add('move_' + (globalThis.front + 2));
                            }
                        }
                        globalThis.front = (globalThis.front + 1) % globalThis.size;
                        document.querySelector('.memory .front .vvalue > span').textContent = globalThis.front;
                    });
                    
                    gotoLine(41, 15000);
                    gotoLine(0, 16000, start_);
                    setTimeout(function(){
                    if(!questionDone.includes(2)){
                                questionDone.push(2);
                                askme(2);
                    }
                  }, 16500);
                }
            }
        },
        isFull: function(_this, e){
            
            gotoLine(43, 1000);
            gotoLine(44, 2000);
            gotoLine(45, 3000);
            if((this.rear + 1) % this.size == this.front){
                gotoLine(46, 4000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is full ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                });
                gotoLine(47, 5000, function(){}, true);
                gotoLine(48, 6000, function(){}, true);
                gotoLine(49, 7000);
                gotoLine(0, 8000, start_);
                setTimeout(function(){
                    if(!questionDone.includes(3)){
                                questionDone.push(3);
                                askme(3);
                    }
                  }, 8500);
            }else{
                gotoLine(46, 4000, function(){}, true);
                gotoLine(47, 5000);
                gotoLine(48, 6000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is not full ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                });
                gotoLine(49, 7000);
                gotoLine(0, 8000, start_);
                setTimeout(function(){
                    if(!questionDone.includes(3)){
                                questionDone.push(3);
                                askme(3);
                    }
                  }, 8500);
            }
        },
        isEmpty: function(_this, e){
            let globathis = this;
            gotoLine(51, 1000);
            gotoLine(52, 2000);
            gotoLine(53, 3000);
            
            if(this.rear == -1){
                gotoLine(54, 4000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is empty ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                });
                gotoLine(55, 5000, function(){}, true);
                gotoLine(56, 6000, function(){}, true);
                
            }else{
               gotoLine(54, 4000, function(){}, true);
               gotoLine(55, 5000);
               gotoLine(56, 6000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is not empty ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                   scrollTerminal();
                });
                
            }
            gotoLine(57, 7000);
            gotoLine(0, 8000, start_);
            setTimeout(function(){
                    if(!questionDone.includes(4)){
                                questionDone.push(4);
                                askme(4);
                    }
            }, 8500);
        },
        dipslay: function(_this, e){
            let globalthis = this;
            gotoLine(59, 1000);
            gotoLine(60, 2000);
            gotoLine(61, 3000);
            if(this.front == -1){
                gotoLine(62, 4000, function(){}, true);
                gotoLine(63, 5000, function(){}, true);
                gotoLine(64, 6000, function(){}, true);
                gotoLine(65, 7000, function(){}, true);
                gotoLine(66, 8000, function(){}, true);
                gotoLine(67, 9000, function(){}, true);
                gotoLine(68, 10000, function(){}, true);
                gotoLine(69, 10000, function(){}, true);
                gotoLine(70, 10000, function(){}, true);
                gotoLine(71, 10000, function(){}, true);
                gotoLine(72, 10000, function(){}, true);
                gotoLine(73, 10000, function(){}, true);
                gotoLine(74, 10000, function(){}, true);
                gotoLine(75, 10000, function(){}, true);
                gotoLine(76, 10000, function(){}, true);
                gotoLine(77, 10000, function(){}, true);
                gotoLine(78, 11000);
                gotoLine(79, 12000, function(){
                    let div1 = document.createElement('div');
                    div1.classList.add('code-text');
                    let p1 = document.createElement('p');
                    p1.textContent = 'command>_';
                    p1.classList.add('user');
                    let p2 = document.createElement('p');
                    p2.textContent = ' Queue is empty ';
                    div1.appendChild(p1);
                    div1.appendChild(p2);
                    terminal.appendChild(div1);
                    scrollTerminal();
                });
                gotoLine(80, 13000);
                gotoLine(0, 14000, start_);
                setTimeout(function(){
                    if(!questionDone.includes(5)){
                        questionDone.push(5);
                        askme(5);
                    }
                  }, 14500);
            }else{
                gotoLine(62, 4000, function(){
                    createVariable('i', '', '5838', 'free');   
                });
                gotoLine(63, 5000);
                gotoLine(64, 6000, function(){
                    document.querySelector('.memory .i .vvalue > span').textContent = globalthis.front;
                    document.querySelector('.memory .i').classList.remove('free');
                    document.querySelector('.memory .i').classList.add('used');
                });
                gotoLine(65, 7000, function(){
                    let bytes = document.querySelectorAll('.array-graphical .byte');
                    let timeout = 1000;
                    if(globalthis.rear >= globalthis.front){
                        gotoLine(66, timeout, function(){
                        for(let x = globalthis.front; x<= globalthis.rear; x++){
                                gotoLine(67, timeout, function(){
                                    let div1 = document.createElement('div');
                                    div1.classList.add('code-text');
                                    let p1 = document.createElement('p');
                                    p1.textContent = 'command>_';
                                    p1.classList.add('user');
                                    let p2 = document.createElement('p');
                                    p2.textContent = ' value at ' + x + ' is ' + bytes[x].textContent;
                                    div1.appendChild(p1);
                                    div1.appendChild(p2);
                                    terminal.appendChild(div1);
                                    scrollTerminal();
                                });
                                timeout += 1000;
                                
                                gotoLine(68, timeout, function(){
                                    document.querySelector('.memory .i .vvalue > span').textContent = x + 1;
                                });
                                timeout += 1000;
                        }
                            
                        gotoLine(69, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(70, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(71, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(72, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(73, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(74, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(75, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(76, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(77, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(78, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(79, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(80, timeout, function(){
                            let i = document.querySelector('.memory .i');
                            i.parentNode.removeChild(i);
                        });
                        timeout += 1000;
                        gotoLine(0, timeout, start_);
                        setTimeout(function(){
                            if(!questionDone.includes(5)){
                                questionDone.push(5);
                                askme(5);
                            }
                          }, timeout+500);
                        });
                        
                        
                        
                    }else{
                        gotoLine(66, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(67, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(68, timeout, function(){}, true);
                        timeout += 1000;
                        gotoLine(69, timeout);
                        timeout += 1000;
                        gotoLine(70, timeout, function(){
                            let timecount = 1000;
                            for(let x = globalthis.front; x < globalthis.size; x++){
                                gotoLine(71, timecount, function(){
                                    let div1 = document.createElement('div');
                                    div1.classList.add('code-text');
                                    let p1 = document.createElement('p');
                                    p1.textContent = 'command>_';
                                    p1.classList.add('user');
                                    let p2 = document.createElement('p');
                                    p2.textContent = ' value at ' + x + ' is ' + bytes[x].textContent;
                                    div1.appendChild(p1);
                                    div1.appendChild(p2);
                                    terminal.appendChild(div1);
                                    scrollTerminal();
                                });
                                
                                timecount += 1000;
                                
                                gotoLine(72, timecount, function(){
                                    document.querySelector('.memory .i .vvalue > span').textContent = x + 1;
                                });
                                
                                timecount += 1000;
                            }
                            
                            gotoLine(73, timecount);
                            timecount += 1000;
                            gotoLine(74, timecount, function(){
                                document.querySelector('.memory .i .vvalue > span').textContent = '0';
                            });
                            timecount += 1000;
                            gotoLine(75, timecount, function(){
                               let timecount = 1000; 
                               for(let x = 0; x <= globalthis.rear; x++){
                                       gotoLine(76, timecount, function(){
                                        let div1 = document.createElement('div');
                                        div1.classList.add('code-text');
                                        let p1 = document.createElement('p');
                                        p1.textContent = 'command>_';
                                        p1.classList.add('user');
                                        let p2 = document.createElement('p');
                                        p2.textContent = ' value at ' + x + ' is ' + bytes[x].textContent;
                                        div1.appendChild(p1);
                                        div1.appendChild(p2);
                                        terminal.appendChild(div1);
                                           scrollTerminal();
                                        });
                                       timecount += 1000;
                                   
                                       gotoLine(77, timecount, function(){
                                        document.querySelector('.memory .i .vvalue > span').textContent = x + 1;
                                    });
                                   timecount += 1000;
                               }
                                
                               gotoLine(78, timecount, function(){}, true);
                               timecount += 1000;
                               gotoLine(79, timecount, function(){}, true);
                               timecount += 1000;
                               gotoLine(80, timecount, function(){
                                   let i = document.querySelector('.memory .i');
                                    i.parentNode.removeChild(i);
                               });
                               timecount += 1000;
                               gotoLine(0, timecount, start_);
                                setTimeout(function(){
                                    if(!questionDone.includes(5)){
                                        questionDone.push(5);
                                        askme(5);
                                    }
                                  }, timecount+500);
                            });
                            
                        });
                        
                        
                    }
                });
            }
        }
    }
    enQueueelm.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.enQueue(this, e);
        }
    });
    deQueueelm.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.deQueue(this, e);
        }
    });
    isFull.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.isFull(this, e);
        }
    });
    isEmpty.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.isEmpty(this, e);
        }
    });
    display.addEventListener('click', function(e){
        if(!program){
        stop_();
        queue.dipslay(this, e);
        }
    });
    /********************************  bash **************************************/
    var start = document.querySelector('header .run');
    start.addEventListener('click', function(e){
        if(!program || !started){
            started = true;
            startMain(this, e);
        }
    });

    function startMain(_this, e){
        if(_this.classList.contains('active')){
            
            stop_();
            
            _this.classList.remove('active');
            _this.childNodes[1].style.display = 'inline-block';
            _this.childNodes[3].style.display = 'none';
            _this.childNodes[5].textContent = 'Run'; 
            
            
            document.querySelector('.array-box').classList.remove('animate');
            document.querySelector('.queue-line').classList.remove('animate');
            document.querySelector('.array-pointer').classList.remove('animate');
            
            setTimeout(function(){
                document.querySelector('.array-graphical').innerHTML = '';
                document.querySelector('.move-box').innerHTML = '';
                document.querySelector('.index-no').innerHTML = '';
                document.querySelector('.memory').innerHTML = '';
                document.querySelector('.array-pointer .front').setAttribute('class','pointer front');
                document.querySelector('.array-pointer .rear').setAttribute('class','pointer rear');
                document.querySelector('.commands-line').innerHTML = '';
                _this.classList.remove('disabled');
            }, 500);
            
            
            queue.size = 0;
            queue.front = -1;
            queue.rear = -1;
            program = true;
            started = false;
            
        }else{
            _this.classList.add('disabled');
            _this.classList.add('active');
            _this.childNodes[1].style.display = 'none';
            _this.childNodes[3].style.display = 'inline-block';
            _this.childNodes[5].textContent = 'Stop';
            Main();
        }
    }

    //////////////////////// algo functions /////////////////////////////
    function start_(){
        document.querySelector('header .run').classList.remove('disabled');
        let cmd = document.querySelectorAll('.operations .cmd');
        for(let x=0; x < cmd.length; x++){
            cmd[x].classList.remove('disabled');
        }
        program = false;
    }
    function stop_(){
        program = true;
        document.querySelector('header .run').classList.add('disabled');
        let cmd = document.querySelectorAll('.operations .cmd');
        for(let x=0; x < cmd.length; x++){
            cmd[x].classList.add('disabled');
        }
    }
    
    
    
    
    function Main(){

        gotoLine(1, 1000);
        gotoLine(2, 2000);
        gotoLine(3, 3000,  function(){
            createVariable('array_size', '', '5200', 'free');
            createVariable('front', '', '5304', 'free');
            createVariable('rear', '', '5108', 'free');
        });
        gotoLine(4, 4000, function(){
            let div1 = document.createElement('div');
            div1.classList.add('code-text');
            let p1 = document.createElement('p');
            p1.textContent = 'command>_';
            p1.classList.add('user');
            let p2 = document.createElement('p');
            p2.textContent = ' enter array size ';
            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.classList.add('getCommand');
            div1.appendChild(p1);
            div1.appendChild(p2);
            div1.appendChild(input);
            terminal.appendChild(div1);
        });
        gotoLine(5, 5000, function(){
           let getCommand = document.querySelector('.getCommand');
           getCommand.focus();
           getCommand.addEventListener('input', function(e){
             if(!isNaN(this.value) && parseInt(this.value) <= 10 && parseInt(this.value) >= 5){

              }
              else{
                this.value = '';
              }

           });
           getCommand.addEventListener('keypress', function(e){
               if(!isNaN(this.value) && parseInt(this.value) <= 10 && 
                     parseInt(this.value) >= 5){
                    if(e != undefined && event.keyCode == 13){
                        this.blur();
                        let span = this.previousSibling;
                        queue.size = this.value;
                        
                        
                        
                        
                        span.textContent = span.textContent + ' ' + this.value;
                        document.querySelector('.memory .array_size').classList.remove('free');
                        document.querySelector('.memory .array_size').classList.add('used');
                        document.querySelector('.memory .array_size .vvalue > span').textContent = queue.size;
                        this.parentNode.removeChild(this);
                        gotoLine(6, 0, function(){
                            let moveBox = document.querySelector('.move-box');
                            for(let x = 1; x < queue.size; x++){
                                let  div = document.createElement('div');
                                div.classList.add('symbol')
                                let  div2 = document.createElement('div');
                                div.appendChild(div2);
                                moveBox.appendChild(div);
                            }
                            
                            createVariable('queue', '[...]', '5256', 'free');
                            document.querySelector('.array-box .queue').style.width = 
                                queue.size * 60 + 'px';
                            for(let x = 0; x < queue.size; x++){
                                let div = document.createElement('div');
                                div.classList.add('byte', 'free');
                                div.textContent = 'free';
                                document.querySelector('.array-box .queue .array-graphical').appendChild(div);
                            }
                            let indexNo = document.querySelector('.array-box .index-no');
                            indexNo.style.width = ((parseInt(queue.size) + 1) * 60) + 'px';
                            document.querySelector('.array-pointer').style.width = ((parseInt(queue.size) + 1) * 60) + 'px';
                            for(let x = -1; x< queue.size; x++){
                                let div = document.createElement('div');
                                div.classList.add('number');
                                div.textContent = x;
                                x == -1 ? div.classList.add('active') : '';
                                indexNo.appendChild(div);
                            }
                            document.querySelector('.direction-box .queue-line').
                            classList.toggle('animate');

                            setTimeout(function(){
                            document.querySelector('.array-box').classList.toggle('animate');
                                }, 500);
                        });
                        gotoLine(7, 1000);
                        gotoLine(8, 2000, function(){
                            document.querySelector('.front').classList.remove('free');
                            document.querySelector('.front').classList.add('used');
                            document.querySelector('.front .vvalue > span').textContent = -1;
                            document.querySelector('.array-pointer').classList.toggle('animate');

                        });
                        gotoLine(9, 3000, function(){
                            document.querySelector('.rear').classList.remove('free');
                            document.querySelector('.rear').classList.add('used');
                            document.querySelector('.rear .vvalue > span').textContent = -1;
                        });
                        gotoLine(10, 4000);
                        gotoLine(0, 5000, start_);
                    }
                  }
           });


        });
    }

    function createVariable(name, value, address, type){
        let memory = document.querySelector('.memory');
        let div = document.createElement('div');
        div.classList.add('variable');
        div.classList.add(type);
        div.classList.add(name);
        let div2 = document.createElement('div');
        let span = document.createElement('span');

        span.textContent = name;
        div2.className = 'vname';
        div2.appendChild(span);
        div.appendChild(div2);

        div2 = document.createElement('div');
        span = document.createElement('span');
        span.textContent = value;
        div2.className = 'vvalue';
        div2.appendChild(span);
        div.appendChild(div2);

//                    div2 = document.createElement('div');
//                    span = document.createElement('span');
//                    span.textContent = address;
//                    div2.className = 'vaddress';
//                    div2.appendChild(span);
//                    div.appendChild(div2);

        memory.appendChild(div);

    }


terminal.addEventListener('click', function(){
    let getCommand = document.querySelector('.getCommand');
    if(getCommand != null){
        getCommand.focus();
    }
});


document.querySelector('.reload-terminal').addEventListener('click', function(){
           document.querySelector('.commands-line').innerHTML = '';
            
        });
    
    function scrollTerminal(){
            let terminal = document.querySelector('.bash .command');
            terminal.scrollTop = terminal.scrollHeight;
        }


let correct = 0;
        let options = document.querySelectorAll('.askme .checkbox input');
        
       function askme(questionNo){
            let question = document.querySelector('.askme .question > h4');
            let option_ = document.querySelectorAll('.checkbox label');
            switch (questionNo){
                case 1:
                    question.textContent = 'Q. What if (rear + 1) % Array size = front';
                    option_[0].childNodes[0].textContent = 'Queue is full.';
                    option_[1].childNodes[0].textContent = 'Queue is empty.';
                    option_[2].childNodes[0].textContent = 'Both (a) and (b).';
                    option_[3].childNodes[0].textContent = 'None of the above.';
                    correct = 0;
                    break;
                case 2:
                    question.textContent = 'Q. Cicular queue is a ?';
                    option_[0].childNodes[0].textContent = 'FIFO (First In First Out) list.';
                    option_[1].childNodes[0].textContent = 'LIFO (Last In First Out) list.';
                    option_[2].childNodes[0].textContent = 'Ordered array.';
                    option_[3].childNodes[0].textContent = 'Linear tree.';
                    correct = 0;
                    break;
                case 3:
                    question.textContent = 'Q. What if rear = front';
                    option_[0].childNodes[0].textContent = 'Queue is empty.';
                    option_[1].childNodes[0].textContent = 'Queue is full.';
                    option_[2].childNodes[0].textContent = 'Queue has only one element.';
                    option_[3].childNodes[0].textContent = 'None of the above.';
                    correct = 2;
                    break;
                case 4:
                    question.textContent = 'Q. What is Cicular Queue empty condition?';
                    option_[0].childNodes[0].textContent = 'Rear equals Front.';
                    option_[1].childNodes[0].textContent = 'Front equals -1.';
                    option_[2].childNodes[0].textContent = 'Front equals Array size - 1';
                    option_[3].childNodes[0].textContent = 'Rear equals Array size - 1';
                    correct = 1;
                    break;
                case 5:
                    question.textContent = 'Q. What is Time complexity of deQueue operation in Cicular Queue?';
                    option_[0].childNodes[0].textContent = 'O(n-1).';
                    option_[1].childNodes[0].textContent = 'O(n).';
                    option_[2].childNodes[0].textContent = 'O(1).';
                    option_[3].childNodes[0].textContent = 'None of the above.';
                    correct = 1;
                    break;
                    
                    
            }
            document.querySelector('.askme').style.display = 'flex';
        }
        
        
        function checkAnswer(index){
            for(let x = 0; x < options.length; x++){
                if(index != x){
                    options[x].checked = false;
                    options[x].nextSibling.nextSibling.classList.remove('false')
                }
                
            }
            if(index != correct){
                    options[index].nextSibling.nextSibling.classList.add('false');
            }else{
                setTimeout(function(){
                    document.querySelector('.askme').style.display = 'none';
                    for(let x = 0; x < options.length; x++){
                            options[x].checked = false;
                            options[x].nextSibling.nextSibling.classList.remove('false')
                    }
                }, 1000);
                
                
            }
        }
        
        for(let x = 0; x < options.length; x++){
            options[x].addEventListener('change', function(){
                checkAnswer(x);
            });
        }


document.querySelector('.simulater').addEventListener('click', function(){
           document.querySelector('.information').classList.add('animate');
       });
       document.querySelector('.theory').addEventListener('click', function(){
           document.querySelector('.information').classList.remove('animate');
       });









}
window.addEventListener('load', main);