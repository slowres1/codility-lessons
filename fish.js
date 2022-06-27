/*this function is for the fish challenge. Essentially it
runs through a (fairly long) series of checks, using a stack
to compare fish objects. As a result though, only has complexity O(n) or thereabouts */

function solution(A, B) {
    //first we merge A and B into a array of objects, with properties A and B
    let fish = [];
    for(i=0;i<A.length;i++) {
        fish[i] = {
            size: A[i],
            direction: B[i]
        }
    }
    //initialise our stack. This will be our comparison method for fish
    let stack = [];

    for (i=0;i<A.length;i++) {
        
        //if the stack is empty, or the fish in the previous position is heading upstream,
        //i.e "away" from the next fish, we can add a fish to the stack.
        if (stack.length === 0 || stack[stack.length-1].direction === 0) {
            stack.push(fish[i]);

        } else if (stack[stack.length-1].direction === 1) {
            //if the stack is not empty, and the fish in the prev. position is heading
            //"towards" the next fish, we then check if our new fish is heading in the 
            //same direction. If so, we add the fish as they won't interact
            if (fish[i].direction === 1) {
                stack.push(fish[i]);

            } else {
                //if the new fish is heading towards our old fish, though, then the eating
                //begins! we want this as a while loop as we don't know how long the 
                //feeding frenzy will last.
                let eating = true;
                while (eating) {
                    //to start, we check if there's no fish left. If so, we add the latest
                    //fish (because he ate all the others!)
                    if (stack.length === 0) {
                        stack.push(fish[i])
                        eating = false;
                    //if the stack isn't empty and the fish on top is heading towards our 
                    //new fish, they compare sizes. If the new fish is larger, we remove
                    //the old one from the stack. If not, the eating stops and we don't 
                    //add anything (the old fish ate the new fish)    
                    } else if (stack[stack.length-1].direction === 1) {   
                        if (stack[stack.length-1].size < fish[i].size) {
                            stack.pop()
                        } else {
                            eating = false;
                        }
                    //this else triggers if the next fish in the stack is heading upstream,
                    //i.e in the same direction as our new fish. In which case, we just add
                    //the new fish to the stack.
                    } else {
                        stack.push(fish[i]);
                        eating = false;
                    }
                    
                }
            }
        }
    }
    //in total, we perform one loop to create an object array, then another loop, with an optional
    //while loop within it. Though this while loop won't trigger much, and when it does it won't again
    //for a 'while'! 
    //We output our final stack length, which contains all the surviving fish!
    return stack.length;
}