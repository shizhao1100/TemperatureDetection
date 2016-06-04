function PolyFit() {
    /*==================polyfit(n,x,y,poly_n,a)===================*/
    /*=======拟合y=a0+a1*x+a2*x^2+……+apoly_n*x^poly_n========*/
    /*=====n是数据个数 xy是数据值 poly_n是多项式的项数======*/
    /*===返回a0,a1,a2,……a[poly_n]，系数比项数多一（常数项）=====*/
    
    
    /*错误代码 
       
    2 Error! X||Y shuold be array
    
    3 Error! X.length!=y.length
    
    4 Error! X||Y value shuold be number;
    
    
    */
    
    this.polyfit = function (x,y,poly_n,a) {
        if(!(x.length >1 && y.length>1))
        {
            return 2
        }
        if(x.length!=y.length)
        {
            return 3
        }
        for(var i=0;i<x.length;i++)
        {
            if(isNaN(x[i]) || isNaN(y[i]))
            {
                return 4
            }
        }      
            var i,j;
            var tempx = new Array();
            var tempy = new Array();
            var sumxx = new Array();
            var sumxy = new Array();
            var ata = new Array();
            
            for(i=0;i<x.length;i++)
            {
               tempx.push(1);
               tempy.push(y[i]);
            }
            for(i=0;i<2*poly_n+1;i++)
            {
                for (sumxx[i] = 0, j = 0;j<x.length;j++)
                {
                    sumxx[i] += tempx[j];
                    tempx[j] *= x[j];
                }
            }
            
            for (i = 0;i<poly_n + 1;i++)
            {
                for (sumxy[i] = 0, j = 0;j<x.length;j++)
                {
                    sumxy[i] += tempy[j];
                    tempy[j] *= x[j];
                }
            }
            
            for (i = 0;i<poly_n + 1;i++)
            {
                for (j = 0;j<poly_n + 1;j++)
                {
                    ata[i*(poly_n + 1) + j] = sumxx[i + j];
                }
            }
           this.gauss_solve(poly_n + 1, ata, a, sumxy);     
        
        return 1;
    }
    this.gauss_solve = function(n,A,x,b){
        var i, j, k, r;
	    var max;
	    for (k = 0;k<n - 1;k++)
	    {
		    max = Math.abs(A[k*n + k]); /*find maxmum*/
		    r = k;
		    for (i = k + 1;i<n - 1;i++)
            {
			    if (max<Math.abs(A[i*n + i]))
			    {
				    max = Math.abs(A[i*n + i]);
				    r = i;
			    }
            }
		    if (r != k)
            {
			    for (i = 0;i<n;i++) /*change array:A[k]&A[r] */
			    {
				    max = A[k*n + i];
				    A[k*n + i] = A[r*n + i];
				    A[r*n + i] = max;
			    }
            }
		    max = b[k]; /*change array:b[k]&b[r] */
		    b[k] = b[r];
		    b[r] = max;
		    for (i = k + 1;i<n;i++)
		    {
			    for (j = k + 1;j<n;j++)
                {
				    A[i*n + j] -= A[i*n + k] * A[k*n + j] / A[k*n + k];
                }
			    b[i] -= A[i*n + k] * b[k] / A[k*n + k];
		    }
	    }
	    for (i = n - 1;i >= 0;x[i] /= A[i*n + i], i--)
        {
		    for (j = i + 1, x[i] = b[i];j<n;j++)
            {
			    x[i] -= A[i*n + j] * x[j];
            }
        }
    }
}